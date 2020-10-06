const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //for 
const helmet = require('helmet');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors('*'))
    app.use(helmet());
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}