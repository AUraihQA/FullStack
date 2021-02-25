'use strict';
const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {DB_URL, DB_NAME} = require('../config/const.json');

const playerSchema = new Schema ({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    primaryPosition: {type: String, require: true},
    secondaryPosition: String,
    team: String,
    age: {type: Number, require: true}
})

const Player = model('Player', playerSchema);

mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}` ,{ useNewUrlParser:true, useUnifiedTopology: true} ,(err) => {
    if(err) {
        console.error(err);
    } else {
        console.log('Connected');
    }
})

module.exports = {"Player": Player}