const { queryFromSongs }  = require("../integrations/openai");
const { SONG_DELIMITER } = require("../constants");

const generateSongs = async (req, res) => {
    if(!req.body.options) {
        res.status(401).send("No configuration options sent.");
    } else {
        let result = await queryFromSongs(req.body.options);
        result = result.split(SONG_DELIMITER)
        res.status(200).send(result);
    }
}

module.exports = {
    generateSongs,
}