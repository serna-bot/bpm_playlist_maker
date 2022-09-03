import request from "request";
import User from '../models/user.js';

const genreToArtists = async(id, genres) => {
    let list_of_artists = [];
    let genreArtists = {};
    try {
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
        console.log("error", err)
    }
    return list_of_artists;
};

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
    const responses = await Promise.all(promises);
    for (const response of responses) {
        const temp = list_of_tracks.concat(response);
        list_of_tracks = temp;
    }
    return list_of_tracks;
};

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

const splitPlaylist = async(token, playlist_id, tracks) => {
    let clone_tracks = [...tracks];
    console.log(clone_tracks.length);
    let tracks_split = [];
    let length = clone_tracks.length;
    const num_requests = Math.floor(length/100);
    for (let i = 0; i < num_requests; i++) {
        const index = length - 100;
        let temp = clone_tracks.splice(index);
        console.log("blash", temp.length);
        length -= 100;
        tracks_split.push(temp);
    }
    if (clone_tracks.length > 0) {
        tracks_split.push(clone_tracks);
    }
    let requests = [];
    for (const track_list of tracks_split) {
        var authOptions = {
            url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            form: JSON.stringify({
                'uris' : track_list
            }),
            json: true
        };
        requests.push(authOptions);
    }
    return requests;
};

const postJSON = async(authOptions) => {
    await (new Promise(function (resolve, reject) {
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 201) {
                resolve(body);
            }
            else {
                console.log("failed in adding tracks", response);
                reject(error);
            }
        });
    }));
};

export const createPlaylist = async(req, res) => {
    const token = req.body.token;
    const name = req.body.name;
    const user = await User.findById(req.params.id);
    var authOptions1 = {
        url: `https://api.spotify.com/v1/users/${user.spotify_id}/playlists`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json'
        },
        form: JSON.stringify(
            {
                "name" : name,
                "description": "New playlist description",
                "public" : false
            }
        ),
        json: true
    };
    const res1 = await (new Promise(function (resolve, reject) {
        request.post(authOptions1, function(error, response, body) {
            if (!error && response.statusCode === 201) {
                console.log("created playlist");
                resolve(body);
            }
            else {
                reject(error);
            }
        });
    }));
    const playlist_id = res1.id;
    let playlist = [];
    for (const track of user.tracks) {
        playlist.push(track.uri)
    }
    const urls = await splitPlaylist(token, playlist_id, playlist);
    let promises = urls.map(url => postJSON(url));
    Promise.all(promises).then (data => {
        console.log("done");
        res.status(200).send({success: "yay"});
    });
};
