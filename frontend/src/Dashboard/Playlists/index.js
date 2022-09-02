import { useParams } from 'react-router-dom';
import {useState } from 'react';
import Select from 'react-select';
import * as api from '../../api/index.js';
import {getToken} from '../../shared/token.js';
import {genreList} from '../../shared/genreList.js';
import './Playlists.scss';

function Playlists() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
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
        setPlaylist(response.data.tracks);
        setLoaded(true);
        console.log('here', playlist);
    };

    const editOrderOfTracks = async () => {
        //changes the position of the tracks
    }

    const createPlaylist = async () => {
        const response = api.createPlaylist(id, 
            {
                "name" : playlistName,
                "token" : token
            }
        );
    };

    const onNameChange = async (name) => {
        setPlaylistName(name.target.value);
    }

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
            <div>
                {(() => {
                        if (loaded) 
                            return (
                                <div>
                                    <button onClick={loadTracks}> Update</button>
                                    <button onClick={createPlaylist}> Create Playlist</button>
                                    <input 
                                        type='text' 
                                        placeholder='Insert Playlist Name' 
                                        value={playlistName} 
                                        onChange={onNameChange} />
                                </div>
                            )
                        else return <button onClick={loadTracks}> Submit</button>
                })()}
            </div>
            <div>
                {(() => {
                    if (loaded) return playlist.map(track => {
                        return (
                            <div>
                                <img src = {track.album.images[0].url} alt = "artist_img"></img>
                                <div>{track.name}</div>
                                <div>
                                    {track.artists.map(artist => {
                                        return <div>{artist.name}</div>
                                    })}
                                </div>
                            </div>
                        );
                    })
                    else return <h1>No playlist created yet.</h1>
                })()}
            </div>
        </div>
    );
};

export default Playlists;