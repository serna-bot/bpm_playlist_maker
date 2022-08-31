import { useParams } from 'react-router-dom';
import {useEffect, useState } from 'react';
import Select from 'react-select';
import * as api from '../../api/index.js';
import {getToken} from '../../shared/token.js';
import {genreList} from '../../shared/genreList.js';

function Playlists() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [genres, setGenres] = useState([]);
    const token = getToken();

    const onDropdownChange = (e) => {
        console.log(e);
        let value = Array.from(e, option => option.value);
        setGenres(value);
    };

    const loadTracks = async () => {
        const response = await api.updateGenres(id, {
            headers: {
                Bearer : token,
                Genres : genres
            }
        });
        setPlaylist(response.data);
        console.log('here', playlist);
    };

    return (
        <div>
            <Select 
                isMulti = {true} 
                onChange = {onDropdownChange} 
                placeholder='genres' 
                openMenuOnClick={false} 
                options = {genreList} 
                values = {genres}
            />
            <button onClick={loadTracks}> Submit</button>
        </div>
    );
};

export default Playlists;