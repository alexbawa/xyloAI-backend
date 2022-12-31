const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Playlist = require("./Playlist").schema;


const MAX_FREE_DRAFTS = 2;
const MAX_FREE_PUBLISHED = 1;

let User = new Schema({
    spotify_email: {type: String, required: true, index: {unique: true}},
    draft_count: {type: Number, default: 0},
    published_count: {type: Number, default: 0},
    permitted_drafts: {type: Number, default: MAX_FREE_DRAFTS},
    permitted_published: {type: Number, default: MAX_FREE_PUBLISHED},
    drafts: {type: [Playlist], default: []},
    published: {type: [String], default: []}, // by Spotify ID of playlists
})

module.exports = {
    model: mongoose.models.User || mongoose.model("User", User),
}