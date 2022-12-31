const express = require("express");
const {GenerateRouter} = require("./generate.router");
const {UserRouter} = require("./user.router");

const Router = express.Router();

Router.use("/generate", GenerateRouter);
Router.use("/user", UserRouter);

module.exports = {Router};