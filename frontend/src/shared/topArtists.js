import {getToken} from './token.js';

export const getTopArtists = async() => {
    let token = getToken();
    const url = 'https://api.spotify.com/v1/me/top/artists?limit=50';
    const request = await fetch (
        url, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await request.json();
    if (!data.hasOwnProperty("error")) {
        return {
            items : data.items
        };
    }
}