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
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'female', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Default" })
					})
				}
				else if (interest == 'male' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'male', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Default" })
					})
				}
				else if (interest == 'both') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND interest = ? ORDER BY id', [login, 'both'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Default" })
					})
				}
				else if (interest == 'male' && gender == 'male') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'male', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Default" })
					})
				}
				else if (interest == 'female' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'female', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Default" })
					})
				}
			}
		})
	}
	else
		res.redirect('/');
})

router.get('/popularity', function(req, res) {
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
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY popu DESC', [login, 'female', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "popu" })
					})
				}
				else if (interest == 'male' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY popu DESC', [login, 'male', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "popu" })
					})
				}
				else if (interest == 'both') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND interest = ? ORDER BY popu DESC', [login, 'both'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "popu" })
					})
				}
				else if (interest == 'male' && gender == 'male') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY popu DESC', [login, 'male', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "popu" })
					})
				}
				else if (interest == 'female' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY popu DESC', [login, 'female', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "popu" })
					})
				}
			}
		})
	}
	else
		res.redirect('/');
})

router.get('/age', function(req, res) {
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
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY age', [login, 'female', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "age" })
					})
				}
				else if (interest == 'male' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY age', [login, 'male', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "age" })
					})
				}
				else if (interest == 'both') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND interest = ? ORDER BY age', [login, 'both'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "age" })
					})
				}
				else if (interest == 'male' && gender == 'male') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY age', [login, 'male', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "age" })
					})
				}
				else if (interest == 'female' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY age', [login, 'female', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "age" })
					})
				}
			}
		})
	}
	else
		res.redirect('/');
})

router.get('/newUser', function(req, res) {
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
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'female', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Newest" })
					})
				}
				else if (interest == 'male' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'male', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Newest" })
					})
				}
				else if (interest == 'both') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND interest = ? ORDER BY id', [login, 'both'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Newest" })
					})
				}
				else if (interest == 'male' && gender == 'male') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'male', 'male'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Newest" })
					})
				}
				else if (interest == 'female' && gender == 'female') {
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? ORDER BY id', [login, 'female', 'female'], function(err, row) {
						if (err) console.log(err)
						var profil = row
						res.render('home', { title: 'Home', profil: profil, filter: "Newest" })
					})
				}
			}
		})
	}
	else
		res.redirect('/');
})

module.exports = router
