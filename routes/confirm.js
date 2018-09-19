var express = require('express')
var router = express.Router()
var connect = require('../config/database.js')
var session = require('express-session')

router.get('/', function(req, res, next) {
	res.render('login', {title: 'Login'})
})

router.get('/:hash', function(req, res) {
	var hash = req.params.hash,
		queryString = "SELECT login FROM users WHERE hash = ?";
		connect.query(queryString, [hash], function (err, rows) {
			if (err) throw err
			if (rows[0].login)
			{
				connect.query("UPDATE users SET confirm = 1 WHERE login = ?", [rows[0].login], function(err) {
					if (err) throw err
					req.session.success = "Your account has been validated successfully, you can now log in";
					res.redirect('/login');
				})
			}
			else
			{
				req.session.error = "An error occured"
				res.redirect('/home');
			}
		})
})

module.exports = router