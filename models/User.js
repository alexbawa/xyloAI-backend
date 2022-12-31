const mongoose = require("mongoose");
const Schema = mongoose.Schema;

MAX_FREE_DRAFTS = 2;
MAX_FREE_PUBLISHED = 1;

let User = new Schema({
    spotify_email: {type: String, required: true, index: {unique: true}},
    draft_count: {type: Number, default: 0},
    published_count: {type: Number, default: 0},
    permitted_drafts: {type: Number, default: MAX_FREE_DRAFTS},
    permitted_published: {type: Number, default: MAX_FREE_PUBLISHED},
})

module.exports = {
    model: mongoose.models.User || mongoose.model("User", User),
}