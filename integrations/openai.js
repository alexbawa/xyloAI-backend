const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
dotenv.config()

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const OpenAI = new OpenAIApi(config);

const listFormat = "'Song Title' by Artist; 'Song Title' by Artist; etc.";

const queryFromSongs = async (options) => {
    let queryString = "";
    let songsIncluded = false;
    if(options.songs && options.songs.length > 0) {
        let songsAsString = options.songs.join(", ");
        queryString += `I like these songs: ${songsAsString}.`;
        songsIncluded = true;
    }

    queryString += ` Give me ${options.count} songs`;

    if(options.era) {
        queryString += ` that are from the ${options.era} era`;
    }

    if(songsIncluded) {
        queryString += " that match their musical vibe"
    }

    queryString += ` in this format: ${listFormat}`;
    
    const query = await OpenAI.createCompletion({
        model: "text-davinci-003",
        prompt: queryString,
        temperature: 0.9,
        frequency_penalty: 1.5,
        max_tokens: 250,
    });

    return query.data.choices[0].text;
}

module.exports = {
    queryFromSongs,
}


