import {getToken} from '../shared/token.js';

export const getUser = async() => {
    let token = getToken();
    console.log("poop", token);
    const url = 'https://api.spotify.com/v1/me';
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
            display_name : data.display_name,
            email : data.email,
            profile_image : data.images[0].url
        };
    }
    console.log("shit");
    return "error";
};