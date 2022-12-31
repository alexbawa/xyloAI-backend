const express = require("express");
const { createUser }  = require("../controllers/user.controller");
const UserRouter = express.Router();
UserRouter.use(express.json());

// method: POST
//         This method creates a user in MongoDB to track
//         their usage
UserRouter.post("/", async (req, res) => {
    if(!req.body.user) {
        res.status(401).send("No user configuration sent.");
    } else {
        try {
            let resultUser = await createUser(req.body.user);
            res.status(200).send(resultUser);
        } catch (err) {
            res.status(500).send(err);
        }
    }
})

module.exports = {UserRouter};