const { queryFromSongs }  = require("../integrations/openai");

const generateSongs = async (options) => {
    let result = await queryFromSongs(options);
    result = result.split("; ");
    return result;
}

module.exports = {
    generateSongs,
}