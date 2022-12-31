const express = require("express");
const {GenerateRouter} = require("./generate.router");

const Router = express.Router();

Router.use("/generate", GenerateRouter);

module.exports = {Router};