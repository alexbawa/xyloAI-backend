const express = require("express");
const { 
    createUser,
    getUser,
    userAddDrafts,
    userAddPublished,
    createPlaylist,
    playlistAddSongs,
    playlistChangeName,
    publishPlaylist,
}  = require("../controllers/user.controller");
const UserRouter = express.Router();
UserRouter.use(express.json());

// method: POST
//         This method creates a User in MongoDB to track
//         their usage
UserRouter.post("/", async (req, res) => {
    try {
        await createUser(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: GET
//         This method gets a User from MongoDB
UserRouter.get("/:userID", async (req, res) => {
    try {
        await getUser(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method updates a User in MongoDB to have
//         more available draft playlists
UserRouter.put("/:userID/addDrafts", async (req, res) => {
    try {
        await userAddDrafts(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method updates a User in MongoDB to have
//         more available published playlists
UserRouter.put("/:userID/addPublished", async (req, res) => {
    try {
        await userAddPublished(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: POST
//         This method creates a draft Playlist in MongoDB
//         and increments User's draft_count
UserRouter.post("/:userID/playlist", async (req, res) => {
    try {
        await createPlaylist(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method updates a draft Playlist in MongoDB
//         and to include new songs
UserRouter.put("/:userID/playlist/:playlistID/addSongs", async (req, res) => {
    try {
        await playlistAddSongs(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method updates a draft Playlist in MongoDB
//         and to have a new name
UserRouter.put("/:userID/playlist/:playlistID/changeName", async (req, res) => {
    try {
        await playlistChangeName(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method publishes a Playlist to Spotify
//         and increments User's published_count
UserRouter.put("/:userID/playlist/:playlistID/publish", async (req, res) => {
    try {
        await publishPlaylist(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = {UserRouter};