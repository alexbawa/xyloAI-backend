const express = require("express");
const { 
    createUser,
    getUser,
    userAddDrafts,
    userAddPublished,
    createPlaylist,
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
//         This method get a User from MongoDB
UserRouter.get("/:userID", async (req, res) => {
    try {
        await getUser(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method creates a User in MongoDB to track
//         their usage
UserRouter.put("/:userID/addDrafts", async (req, res) => {
    try {
        await userAddDrafts(req, res)
    } catch (err) {
        res.status(500).send(err);
    }
})

// method: PUT
//         This method creates a User in MongoDB to track
//         their usage
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

module.exports = {UserRouter};