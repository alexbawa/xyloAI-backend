const express = require("express");
const { generateSongs }  = require("../controllers/generate.controller");
const GenerateRouter = express.Router();
GenerateRouter.use(express.json());


// method: POST
//         This method generates a list of songs via 
//         OpenAI's DaVinci model based on req.body.options 
GenerateRouter.post("/", async (req, res) => {
    if(!req.body.options) {
        res.status(401).send("No configuration options sent.");
    } else {
        try {
            let resultSongs = await generateSongs(req.body.options);
            res.status(200).send(resultSongs);
        } catch (err) {
            if(err.message) {
                res.status(err.code).send(err.message);
            } else {
                res.status(500).send(err);
            }
        }
    }
})

module.exports = {GenerateRouter};