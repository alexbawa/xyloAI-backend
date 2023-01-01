const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Playlist = new Schema({
    name: {type: String, default: "Draft Playlist"},
    songs: {type: [String], default: []}, // by Spotify ID of songs
})

module.exports = {
    schema: Playlist,
}