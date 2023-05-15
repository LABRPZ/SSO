'use strict'
var express = require('express');
var login = require('../Controllers/Login/login' );
var api = express.Router();

api.post('/login', login.selectCredenciales);
api.post('/SearchGlobalSesion', login.SearchGlobalSession);


module.exports = api;
