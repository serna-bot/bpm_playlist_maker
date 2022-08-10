import { useEffect, useState } from 'react';
import Header from '../shared/Header';
import { getTopArtists } from '../shared/topArtists.js';
import * as api from '../api/index.js';
import './Dashboard.scss';

function Dashboard() {
    useEffect(() => {
        handleTopArtists();
    }, []);
    const [spotifyArtists, setSpotifyArtists] = useState([]);

    const handleTopArtists = async () => {
        const topArtistsList = await getTopArtists();
        setSpotifyArtists(topArtistsList);
    };

    const handleCurrentTopArtists = async () => {
        const artists = await api.fetchTopArtists();
        if (artists == null) {
            handleUpdateArtists(spotifyArtists);
        }
    }

    const handleUpdateArtists = async (artists) => {
       const update = await api.updateTopArtists(artists);
    };
    return (
        <div>
            <Header />
        </div>
    );
}
export default Dashboard;