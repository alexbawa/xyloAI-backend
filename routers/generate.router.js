const express = require("express");
const { generateSongs }  = require("../controllers/generate.controller");
const GenerateRouter = express.Router();
GenerateRouter.use(express.json());


// method: POST
//         This method generates a list of songs via 
//         OpenAI's DaVinci model based on req.body.options 
GenerateRouter.post("/", async (req, res) => {
    try {
        await generateSongs(req, res);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = {GenerateRouter};