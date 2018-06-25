var express = require('express'),
	connect = require('../config/database.js'),
	session = require('express-session'),
	bcrypt = require('bcrypt'),
	regex = require('regex-email'),
	iplocation = require('iplocation'),
	ageCalc = require('age-calculator'),
	parse = require('parse').parse,
	router = express.Router()

