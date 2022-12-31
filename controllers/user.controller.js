const User = require("../models/User").model;
const Playlist = require("../models/Playlist").model;

const createUser = async (req, res) => {
    const spotify_email = req.body.spotify_email;
    if(!spotify_email) {
        res.status(401).send("No user email sent.");
    } else {
        const user = new User({spotify_email})
        await user.save();
        res.status(201).send(user);
    }
    
}

const getUser = async (req, res) => {
    let user = await User.findById(req.params.userID);
    if(user) {
        res.status(200).send(user);
    } else {
        res.status(404).send("No user found.");
    }
}

const createPlaylist = async (req, res) => {
    let user = await User.findById(req.params.userID);
    if(user) {
        if(user.draft_count < user.permitted_drafts) {
            const playlist = new Playlist();
            await playlist.save();

            user.drafts.push(playlist);
            user.draft_count += 1;
            await user.save();

            res.status(201).send(playlist);
        } else {
            res.status(403).send("User has no drafts remaining.");
        }
    } else {
        res.status(404).send("No user found.");
    }
}

module.exports = {
    createUser,
    getUser,
    userAddDrafts,
    userAddPublished,
    createPlaylist,
}