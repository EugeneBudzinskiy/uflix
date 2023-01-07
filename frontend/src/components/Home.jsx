import './Home.css';

import React, {useEffect, useState} from 'react';

import { useApi } from "../utilites/ApiProvider.tsx";

import { IStar, IComment } from "./Icons";


const ShowItems = (items) => {
    return (
        <div className='table-content d-flex row flex-wrap'>
            { items.length > 0 && items.map((item) => (
                <a href={`item?id=${ item.id }`} key={ item.id } 
                    className='item-box d-flex flex-column  
                                col-xl-3 col-md-4 col-sm-6 col-8 offset-sm-0 offset-2 pb-4 px-3'>
                    { item.poster === "null" && <img src="empty_poster.png" alt=''></img> }
                    { item.poster !== "null" && <img src={ item.poster } alt=''></img> }
                    <div className='item-name text-center'>{ item.name }</div>
                    <div className='item-genre text-center'>{ item.genre }</div>
                    <div className='item-footer mt-1 d-flex justify-content-center'>
                        <div className='score d-flex mx-3'>
                            <div className='score-icon me-1 d-flex align-items-center'>
                                <IStar />
                            </div>
                            <span>{ item.score }</span>
                        </div>
                        <div className='comments mx-3 d-flex'>
                            <div className='score-icon me-1'>
                                <IComment />
                            </div>
                            <span>{ item.comments.length }</span>
                        </div>
                    </div>
                </a>
            )) }
            { items.length <= 0 &&
               <div className="d-flex mt-5 justify-content-center">
                   <span className="no-data-found">No Data Found</span>
               </div>
            }
        </div>
    )
}


const RecentUploads = () => {
    const api = useApi();

    const [uploads, setUploads] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    
    const handleResponse = (response) => {
        const recentUploads = response.data.map(
            (data) => ({
                ...data,
                id: `${data["id"]}`,
                name: `${data["name"]}`,
                description: `${data["description"]}`,
                poster: `${data["poster"]}`,
                genre: `${data["genre"]}`,
                score: `${data["score"]}`,
                comments: data["comments"]
            })
        );
        setUploads(recentUploads);
        setIsDataLoaded(true);
    };

    useEffect(() => {
        if (!isDataLoaded && uploads.length <= 0) {
            api.get(`movies`).then((response) => {
                handleResponse(response);
            });
        }
    }, [api, isDataLoaded, uploads]);

    return(
        <>
            <div className='table-header mb-4'>Recently Uploaded</div>
            { ShowItems(uploads) }
        </>
    )
};

class Home extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='home-template d-flex flex-column'>
                    <div className='content'>
                   
                        <RecentUploads />
      
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
export { ShowItems };