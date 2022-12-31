const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Playlist = new Schema({
    name: {type: String},
    songs: {type: [String], default: []}, // by Spotify ID of songs
})

module.exports = {
    model: mongoose.models.Playlist || mongoose.model("Playlist", Playlist),
    schema: Playlist,
}