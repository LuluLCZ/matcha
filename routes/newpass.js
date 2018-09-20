var express = require('express')
var router = express.Router()
var connect = require('../config/database.js')
var session = require('express-session')
var bcrypt = require('bcrypt')

const saltRound = 10


router.get('/', function(req, res, next) {
	res.redirect('/')
})

router.get('/:hash', function(req, res) {
	var hash = req.params.hash;

	connect.query("SELECT login FROM users WHERE hash = ?", [hash], function(err, rows) {
		if (err) throw err
		if (!rows[0])
		{
			req.session.error = "This key is not valid, please try again"
			res.redirect('/home');
		}
		else
		{
			res.render('newpass', {title: 'newpass', login: rows[0].login});
		}
	})
})

router.post('/', function(req, res) {
	var login = req.body.login,
		passwd = req.body.pswd,
		cpasswd = req.body.cpswd
		
	if (login)
	{
		if (passwd && cpasswd && passwd == cpasswd)
		{
			hash =  bcrypt.hashSync(passwd, saltRound)
			connect.query("UPDATE users SET pswd = ? WHERE login = ?", [hash, login], function(err, rows) {
				if (err) throw err
				req.session.success = "Your password has been changed successfully, you can now log in ! Enjoy !"
				res.redirect('/login');
			})
		}
		else
		{
			req.session.error = "Make sure your 2 passwords matches"
			res.redirect('/')
		}
	}
	else
	{
		req.session.error = "An error occured"
		res.redirect('/home');
	}
})

module.exports = router