import request from "request";
import User from '../models/user.js';

const genreToArtists = async(id, genres) => {
    let list_of_artists = [];
    let genreArtists = {};
    try{
        const user = await User.findById(id, 'artists_by_genre');
        genreArtists = user.artists_by_genre;
        for(const genre of genres) {
        if (genreArtists.hasOwnProperty(genre)) {
            for (const artist of genreArtists[genre]) {
                if (!(list_of_artists.includes(artist))) {
                    list_of_artists.push(artist);
                }
            }
        }
    }
    }
    catch (err) {
        console.log("error")
    }
    return list_of_artists;
}

export const updateGenres = async(req, res) => {
    const token = req.get('Bearer');
    const genresString = req.get('Genres');
    const genres = genresString.split(',');
    const list = await updateTracks(token, req.params.id, genres);
    User.findByIdAndUpdate(req.params.id, {tracks : list}).then((user) => {
        if(user) {
            if (list === []) {
                res.status(409).json({error : "no tracks matching the genres provided"});
            }
            res.status(200).json({tracks : list});
        }
        else res.status(400);
    });
    
};

export const clearTracks = async(req, res) => {
    User.findByIdAndUpdate(req.params.id, {tracks : []}).then((user) => {
        if(user) {
            res.status(200);
        }
        else res.status(400);
    });
};

function doRequest(url) {
    return (new Promise(function (resolve, reject) {
        request.get(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(error);
            }
        });
    }))
}

const getJSON = async(authOptions) => {
    let list_of_tracks = [];
    const res = await (new Promise(function (resolve, reject) {
        request.get(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(error);
            }
        });
    }));
    for (const track of res.tracks) {
        if (track.is_playable) {
            list_of_tracks.push(track);
        }
    }
    return list_of_tracks;
};

const updateTracks = async(token, id, genres) => {
    const list_of_artists = await genreToArtists(id, genres);
    let list_of_tracks = [];
    let urls = [];
    for (const artist of list_of_artists) {
        var authOptions = {
            url: `https://api.spotify.com/v1/artists/${artist}/top-tracks?market=US`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            json: true
        };
        urls.push(authOptions);
    }
    let promises = urls.map(url => getJSON(url));
    Promise.all(promises).then((responses) => {
        console.log("shithole", responses);
        for (const response of responses) {
            const temp = list_of_tracks.concat(response);
            list_of_tracks = temp;
        }
        return list_of_tracks;
    })
};