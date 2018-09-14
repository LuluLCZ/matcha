var express = require('express')
var router = express.Router()
var connect = require('../config/database.js')
var session = require('express-session')

router.get('/', function(req, res) {
	queryString = "UPDATE users SET online = 0 WHERE login = ?"
	connect.query(queryString, [req.session.login], function (err) {
		if (err) throw err
	})
	req.session.destroy()
	res.redirect('/')
})

module.exports = router