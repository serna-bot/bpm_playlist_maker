//change top artists, get the config, get the profile
import { ObjectId } from 'mongodb';
import User from '../models/user.js';

export const getProfile = async(req, res) => {
    User.findOne({email : req.query.email}).then((user) => {
        if(user) {
            return res.status(200).json({
                id : user._id.toString(),
                profile_image: user.profile_image,
                display_name : user.display_name
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
    User.findByIdAndUpdate({id : req.params.id}, {top_artists : req.body}).then((user) => {
        if(user) {
            return res.status(200).json(user.top_artists);
        }
        else {
            res.status(400).json({error : "Cannot get"});
        }
    })
};

export const getTopArtists = async(req, res) => {
    User.findById({id : req.params.id}).then((user) => {
        if(user) {
            return res.status(200).json(user.top_artists);
        }
        else {
            res.status(400).json({error : "User does not exist"});
        }
    })
};
