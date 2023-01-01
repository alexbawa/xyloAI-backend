const User = require("../models/User").model;
const { publishToSpotify } = require("../integrations/spotify");

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

const userAddDrafts = async (req, res) => {
    let user = await User.findById(req.params.userID);
    if(user) {
        if(req.body.increment) {
            user.permitted_drafts += req.body.increment;
            await user.save()

            res.status(200).send();
        } else {
            res.status(400).send("No increment specified.");
        }
    } else {
        res.status(404).send("No user found.");
    }
}

const userAddPublished = async (req, res) => {
    let user = await User.findById(req.params.userID);
    if(user) {
        if(req.body.increment) {
            user.permitted_published += req.body.increment;
            await user.save()

            res.status(200).send();
        } else {
            res.status(400).send("No increment specified.");
        }
    } else {
        res.status(404).send("No user found.");
    }
}

const createPlaylist = async (req, res) => {
    let user = await User.findById(req.params.userID);
    if(user) {
        if(user.draft_count < user.permitted_drafts) {
            user.drafts.push({});
            user.draft_count += 1;
            await user.save();

            res.status(201).send(user.drafts[user.drafts.length - 1]);
        } else {
            res.status(403).send("User has no drafts remaining.");
        }
    } else {
        res.status(404).send("No user found.");
    }
}

const playlistAddSongs = async (req, res) => {
    if(req.body.songs) {
        let user = await User.findById(req.params.userID);
        if(user) {
            let playlistIndex = user.drafts.findIndex(draft => {
                return draft._id == req.params.playlistID
            });
            if(playlistIndex > -1) {
                user.drafts[playlistIndex].songs = 
                    [...user.drafts[playlistIndex].songs, ...req.body.songs]
                await user.save();

                res.status(200).send(user)
            } else {
                res.status(404).send("No playlist found.");
            }
        } else {
            res.status(404).send("No user found.");
        }
    } else {
        res.status(400).send("No new songs provided.");
    }
}

const playlistChangeName = async (req, res) => {
    if(req.body.name) {
        let user = await User.findById(req.params.userID);
        if(user) {
            let playlistIndex = user.drafts.findIndex(draft => {
                return draft._id == req.params.playlistID
            });
            if(playlistIndex > -1) {
                user.drafts[playlistIndex].name = req.body.name;
                await user.save();

                res.status(200).send(user)
            } else {
                res.status(404).send("No playlist found.");
            }
        } else {
            res.status(404).send("No user found.");
        }
    } else {
        res.status(400).send("No new name provided.");
    }
}

const publishPlaylist = async (req, res) => {
    if(req.body.spotifyToken) {
        let user = await User.findById(req.params.userID);
        if(user) {
            if(user.published_count < user.permitted_published) {
                let playlistIndex = user.drafts.findIndex(draft => {
                    return draft._id == req.params.playlistID
                });
                if(playlistIndex > -1) {
                    let playlist = await publishToSpotify(req.body.spotifyToken, user.drafts[playlistIndex]);

                    user.drafts.splice(playlistIndex);
                    user.published_count += 1;
                    await user.save();
        
                    res.status(200).send(playlist);
                } else {
                    res.status(404).send("No playlist found.");
                }
            } else {
                res.status(403).send("User has no published remaining.");
            }
        } else {
            res.status(404).send("No user found.");
        }
    } else {
        res.status(401).send("No Spotify authentication provided.")
    }
    
}

module.exports = {
    createUser,
    getUser,
    userAddDrafts,
    userAddPublished,
    createPlaylist,
    playlistAddSongs,
    playlistChangeName,
    publishPlaylist,
}