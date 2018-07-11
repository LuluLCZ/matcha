var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()

router.get('/', function(req, res) {
	if (req.session && req.session.login)
	{
		var login = req.session.login,
			gender = req.session.gender,
			age = req.session.age,
			interest = req.session.interest
			sumup = req.session.sumup
		connect.query('SELECT * FROM users WHERE login != ?', [login], function(err, row, result) {
			if (err) console.log(err)
			if (row.lenght != 0) {
				if (interest == 'female' && gender == 'male') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic FROM users WHERE login != ? AND gender = ? AND interest = ?', [login, 'female', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil })
					})
				}
				else if (interest == 'male' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic FROM users WHERE login != ? AND gender = ? AND interest = ?', [login, 'male', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil })
					})
				}
				else if (interest == 'both') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic FROM users WHERE login != ? AND interest = ?', [login, 'both'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil })
					})
				}
				else if (interest == 'male' && gender == 'male') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic FROM users WHERE login != ? AND gender = ? AND interest = ?', [login, 'male', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil })
					})
				}
				else if (interest == 'female' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic FROM users WHERE login != ? AND gender = ? AND interest = ?', [login, 'female', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil })
					})
				}
			}
		})
	}
	else
		res.redirect('/');
})

module.exports = router
