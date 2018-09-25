var express = require('express')
var router = express.Router()
var connect = require('../config/database.js')
var session = require('express-session')

router.get('/', function(req, res) {
	var date = new Date();
	queryString = "UPDATE users SET online = ?, lastconn = ? WHERE login = ?"
	connect.query(queryString, [0, date, req.session.login], function (err) {
		if (err) throw err
	})
	req.session.destroy()
	res.redirect('/')
})

module.exports = router