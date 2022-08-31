import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../shared/Header';
import { getTopArtists } from '../shared/topArtists.js';
import * as api from '../api/index.js';
import './Dashboard.scss';

function Dashboard() {
    const { id } = useParams();
    useEffect(() => {
        handleTopArtists();
    }, []);
    const [spotifyArtists, setSpotifyArtists] = useState([]);
    const [artistsProfiles, setArtistProfiles] = useState([]); //display current artists later
    const [newSpotifyArtists, setNewSpotifyArtists] = useState([]);

    const handleTopArtists = async () => {
        const topArtistsList = await getTopArtists();
        console.log("artsists: ", topArtistsList.items);
        setNewSpotifyArtists(topArtistsList.items);
        const response = await api.fetchTopArtists(id);
        console.log("res:", response.data.top_artists);
        setSpotifyArtists(response.data.top_artists);
    };

    const handleUpdateArtists = async () => {
        console.log(newSpotifyArtists);
        const response = await api.updateTopArtists(id, newSpotifyArtists);
        console.log("updating", response);
        setSpotifyArtists(response.data);
    };

    const goToPlayList = () => {
        window.location.href = `http://localhost:3000/dashboard/create-playlists/${sessionStorage.getItem('id')}`;
    }
    return (
        <div>
            <Header />
            <button onClick={handleUpdateArtists}>Update Artists</button>
            <button onClick={goToPlayList}>Create Playlists</button>
        </div>
    );
}
export default Dashboard;