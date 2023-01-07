import './ItemPage.css';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import ReactPlayer from 'react-player'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';

import { useApi } from "../utilites/ApiProvider.tsx";
import { useSession } from "../utilites/Session.jsx";
import useSessionTokenManager from "../utilites/useSessionTokenManager";

import { NotificationManager } from 'react-notifications';


const CommentForm = (props) => {
    const api = useApi();
    const { fetchUserID } = useSessionTokenManager();

    const user_id = Number(fetchUserID());
    const [queryParameters] = useSearchParams();
    const movie_id = Number(queryParameters.get("id"));

    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
       setComment(e.target.value);
    };

    const clearData = () =>{
       setComment("");
    }

    function refreshPage() {
        window.location.reload();
    }

    const handleSubmit = () => {
        if (comment.length < 0) {
           NotificationManager.error("Comment must present", "Comment Error")
        } else {
            api.post('comments', {
                text: comment, 
                movie_id: movie_id, 
                user_id: user_id 
            })
            .then(NotificationManager.success("New comment was added", "Success!"))
            .then(handleHide())
            .then(clearData())
        }
    };

    const [showFlag, setShowFlag] = useState(false);

    const handleHide = () => setShowFlag(false);
    const handleShow = () => setShowFlag(true);

    return (
        <div className="popup-container">

            <Button className='add-button px-5 py-2' onClick={ handleShow }>
                <span>Add new comment</span>
            </Button>

            <Modal centered show={ showFlag } onHide={ handleHide }>
                <Form>
                    <Modal.Header closeButton closeVariant='white'>
                       <Modal.Title>Add comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <Form.Group className="mb-3" controlId="formLoginEmail">
                           <Form.Control as="textarea" placeholder="Leave a comment here" 
                            style={{ height: '200px' }} onChange={ handleCommentChange }/>
                       </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                       <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>
                           Submit
                       </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );
}


const PageContent = () => {
    const api = useApi();
    const { isAuthenticated } = useSession();

    const [queryParameters] = useSearchParams();

    const [currentItem, setCurrentItem] = useState();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const handleResponse = (response) => {
        const currentItemData = response.data.map(
            (data) => ({
                ...data,
                id: `${data["id"]}`,
                name: `${data["name"]}`,
                description: `${data["description"]}`,
                poster: `${data["poster"]}`,
                genre: `${data["genre"]}`,
                score: `${data["score"]}`,
                comments: data["comments"],
                url: `${data["url"]}`
            })
        );
        setCurrentItem(currentItemData[0]);
        setIsDataLoaded(true);
    };

    useEffect(() => {
        if (!isDataLoaded && currentItem === undefined) {
            const searchParams = { params: {} };
            searchParams.params.movie_id = Number(queryParameters.get("id"));

            api.get(`movies`, searchParams).then((response) => {
                handleResponse(response);           
            });
        }
    }, [api, isDataLoaded, currentItem]);

    return(
        <>
            { currentItem !== undefined && 
                <div key={ currentItem.id } className='item-page-content d-flex flex-column'>
                    <div className='item-page-info d-flex flex-wrap pb-4 mb-4'>

                        <div className='info-block d-lg-none d-flex flex-column col-12 mb-3'>
                            <div className='name'>{ currentItem.name }</div>
                            <div className='genre'>{ currentItem.genre }</div>
                        </div>

                        <div className="poster-block col-lg-3 col-md-4 col-sm-5 col-6 d-flex flex-column">
                            { currentItem.poster === "null" && <img src="empty_poster.png" alt=''></img> }
                            { currentItem.poster !== "null" && <img src={ currentItem.poster } alt=''></img> }
                        </div>
        
    
                        <div className='info-block col-lg-9 col-md-8 col-sm-7 col-6 ps-4'>
                            <div className='name d-lg-block d-none'>{ currentItem.name }</div>
                            <div className='genre d-lg-block d-none'>{ currentItem.genre }</div>
                            <div className='statistic-block d-flex flex-md-row flex-column py-4'>
                                <div className='score d-flex me-5'>
                                    <div className='score-icon me-2'>Score:</div>
                                    <span>{ currentItem.score }</span>
                                </div>
                                <div className='comments d-flex me-5'>
                                    <div className='score-icon me-2'>Comments:</div>
                                    <span>{ currentItem.comments.length }</span>
                                </div>
                            </div>
                            <div className="description d-md-block d-none">
                                { currentItem.description }
                            </div>
                        </div>

                        <div className='info-block d-md-none d-block'>
                            <div className="description mt-3">
                                { currentItem.description }
                            </div>
                        </div>

                    </div>

                    <div className='item-page-player d-flex col-12 row'>
                        <div className="player-wrapper">
                            <ReactPlayer className="react-player" controls={ true } 
                                width='100%' height='100%' url={ currentItem.url }/>
                        </div>
                    </div>
                    
                    <div className='item-page-comments d-flex flex-column py-4 my-4'>
                        <div className='comments-block-title text-center col-12'>Comments</div>
                        { isAuthenticated() && 
                            <div className='comments-add-button d-flex justify-content-center my-4'>
                                <CommentForm />
                            </div>
                        }
                        <div className='comments-wrapper'>
                            { currentItem.comments.length > 0 && currentItem.comments.map((comment_data) => (
                                <div className='comment-row d-flex flex-column' key={ comment_data.id }>
                                    <div className='comment-row-name mb-1'>{ comment_data.user_name }</div>
                                    <div className='comment-row-text mb-4'>{ comment_data.text }</div>
                                </div>
                            )) }
                            { currentItem.comments.length <= 0 && 
                                <div className='item-page-no-comments text-center my-4'>No comments yet</div>
                             }
                        </div>
                    </div>
                    
                </div>
            }
            { currentItem === undefined &&
               <div className="d-flex mt-5 justify-content-center">
                   <span className="no-data-found">No Data Found</span>
               </div>
            }
        </>
    )
}


class ItemPage extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='home-template d-flex flex-column'>
                    <div className='content'>
                   
                        <div className='table-header mb-4'>Movie page</div>
                        <div className='table-content d-flex row flex-wrap'>

                            <PageContent />

                        </div>
           
                    </div>
                </div>
            </div>
        )
    }
}
export default ItemPage;