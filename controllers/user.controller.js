const User = require("../models/User").model;

const createUser = async (options) => {
    const newUser = new User(options)
    await newUser.save();
    return newUser;
}

module.exports = {
    createUser,
}