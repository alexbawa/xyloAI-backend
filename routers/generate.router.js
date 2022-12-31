const express = require("express");
const { generateSongs }  = require("../controllers/generate.controller");
const GenerateRouter = express.Router();
GenerateRouter.use(express.json());

GenerateRouter.post("/", async (req, res) => {
    if(!req.body.options) {
        res.status(401).send("No configuration options sent.");
    } else {
        try {
            let resultSongs = await generateSongs(req.body.options);
            res.status(200).send(resultSongs);
        } catch (err) {
            res.status(500).send(err);
        }
    }
})

module.exports = {GenerateRouter};