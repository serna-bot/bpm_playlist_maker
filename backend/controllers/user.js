//change top artists, get the config, get the profile
import User from '../models/user.js';

export const getProfile = async(req, res) => {
    User.findOne({email : req.query.email}).then((user) => {
        if(user) {
            return res.status(200).json({
                profile_image: user.profile_image,
                display_name : user.display_name,
                spotify_id : user.id,
                id : user._id.toString()
            });
        }
        else {
            res.status(400).json({error : "User does not exist"});
        }
    })
};

export const register = async(req, res) => {
    User.findOne({email : req.body.email}).then((user) => {
        if(user) {
            return res.status(400).json({email: user.email})
        }
        else {
            const profile = new User(req.body);
            profile.save();
            res.status(201).json(profile);
        }
    })
};

export const updateTopArtists = async(req, res) => {
    let artists_by_genre = {};
    for (const artist of req.body.list) {
        for (const genre of artist.genres) {
            if (!(genre in artists_by_genre)) {
                artists_by_genre[genre] = [artist.id];
            }
            else artists_by_genre[genre].push(artist.id);
        }
    }
    User.findByIdAndUpdate(req.params.id, {top_artists : req.body.list, artists_by_genre : artists_by_genre}).then((user) => {
        if(user) {
            return res.status(200).json(user.top_artists);
        }
        else {
            res.status(400).json({error : "Cannot get"});
        }
    })
};

export const getTopArtists = async(req, res) => {
    User.findById(req.params.id).then((user) => {
        if(user) {
            return res.status(200).json({
                top_artists: user.top_artists});
        }
        else {
            res.status(400).json({error : "User does not exist"});
        }
    })
};

export const getTracks = async(req, res) => {
    User.findById(req.params.id).then((user) => {
        if(user) {
            return res.status(200).json({
                tracks: user.tracks});
        }
        else {
            res.status(400).json({error : "User does not exist"});
        }
    })
};
