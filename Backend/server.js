'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const {PLAYER_URL} = require('./config/const.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const logger = (req, res, next) => {
    console.log(new Date());
    next();
}

app.use(logger);

const playerRoute = require('./Routes/player');

app.use(`${PLAYER_URL}`,playerRoute);

app.use("/hello", (req,res,next) => {
    res.send("hi");
})

app.use((req,res,next) => {
    next(createError(404, 'Resource not found'));
});

app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).send(err.message || "something went wrong");
})

const server = app.listen(5019, () => {
    console.log(`Server has successfully started on port number: ${server.address().port}`);
});

module.exports = server; 