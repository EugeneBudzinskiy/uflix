import './Search.css';

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

import { useApi } from "../utilites/ApiProvider.tsx";

import { ShowItems } from "./Home"


const SearchResults = () => {
    const api = useApi();

    const [availableGenres, setAvailableGenres] = useState([]);
    const [isGenresLoaded, setIsGenresLoaded] = useState(false);

    const [selectedGenre, setSelectedGenre] = useState('none');
    const [selectedTitle, setSelectedTitle] = useState('');

    const [results, setResults] = useState([]);

    const handleGenresResponse = (response) => {
        const genresData = response.data.map(
            (data) => ({
                ...data,
                id: `${data["id"]}`,
                name: `${data["name"]}`
            })
        );
        setAvailableGenres(genresData);
        setIsGenresLoaded(true);
    };

    const handleResponse = (response) => {
        const searchResultData = response.data.map(
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
        setResults(searchResultData);
    };

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    }

    const handleTitleChange = (e) => {
        setSelectedTitle(e.target.value);
    }

    const handleSearch = () => {
        const searchParams = { params: {} };

        if (selectedGenre !== 'none') {
            searchParams.params.genre_id = selectedGenre;
        } 

        if (selectedTitle !== '') {
            searchParams.params.name = selectedTitle;
        } 

        api.get(`movies`, searchParams).then((response) => {
            handleResponse(response);
        });        
    }

    useEffect(() => {
        if (!isGenresLoaded && availableGenres.length <= 0) {
            api.get(`genres`).then((response) => {
                handleGenresResponse(response);
            });
        }
    }, [api, isGenresLoaded, availableGenres]);

    return(
        <>
            <div className='table-header mb-4'>Search</div>
            
            <div className='search-form mb-4 pb-4'>
                <Form className='d-flex justify-content-between flex-md-row flex-column'>
                    <div className='col-md-3 col'>
                        <Form.Select aria-label="Search genre selection" onChange={ handleGenreChange }>
                            <option value='none'>Any genre</option>
                            { availableGenres.length > 0 && availableGenres.map((genre) => (
                                <option key={ genre.id } value={ genre.id }>{ genre.name }</option>
                            )) }
                        </Form.Select>
                    </div>
                    <Form.Group className="col mx-md-3 mx-0 my-md-0 my-3" controlId="formTitle">
                        <Form.Control type="text" placeholder="Title" onChange={ handleTitleChange }/>
                    </Form.Group>
                    <Button className='col-md-2 col-4 offset-md-0 offset-4' onClick={ handleSearch }>
                        Search
                    </Button>
                </Form>
            </div>

            { ShowItems(results) }

        </>
    )
};


class Search extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='search-template d-flex flex-column'>
                    <div className='content'>
                   
                        <SearchResults />     
           
                    </div>
                </div>
            </div>
        )
    }
}
export default Search;