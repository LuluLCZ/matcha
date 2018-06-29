var express = require('express')
var router = express.Router()
var session = require('express-session')
var connection = require('../config/database.js')

router.get('/', function(req, res) {
	req.session.destroy()
	res.redirect('/')
})

module.exports = router