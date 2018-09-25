var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()

router.get('/', function(req, res) {
	if (req.session && req.session.login)
	{
		
		if (req.session.profpic)
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
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id', [login, 'female', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Default", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id', [login, 'male', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Default", me: req.session.login })
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND interest = ? AND fake = ? ORDER BY id', [login, 'both', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Default", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id', [login, 'male', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Default", me: req.session.login })
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id', [login, 'female', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Default", me: req.session.login })
						})
					}
				}
			})
		}
		else
		{
			req.session.error = "You have to choose a profil picture before anything else."
			res.redirect('/profil');
		}
	}
	else
		res.redirect('/');
})

router.get('/popularity', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
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
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY popu DESC', [login, 'female', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "popu", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY popu DESC', [login, 'male', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "popu", me: req.session.login })
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND interest = ? AND fake = ? ORDER BY popu DESC', [login, 'both', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "popu", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY popu DESC', [login, 'male', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "popu", me: req.session.login })
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY popu DESC', [login, 'female', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "popu", me: req.session.login })
						})
					}
				}
			})
		}
		else
		{
			req.session.error = "You have to choose a profil picture before anything else."
			res.redirect('/profil');
		}
	}
	else
		res.redirect('/');
})

router.get('/age', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
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
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY age', [login, 'female', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "age", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY age', [login, 'male', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "age", me: req.session.login })
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND interest = ? AND fake = ? ORDER BY age', [login, 'both', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "age", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY age', [login, 'male', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "age", me: req.session.login })
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY age', [login, 'female', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "age", me: req.session.login })
						})
					}
				}
			})
		}
		else
		{
			req.session.error = "You have to choose a profil picture before anything else."
			res.redirect('/profil');
		}
	}
	else
		res.redirect('/');
})

router.get('/newUser', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
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
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id DESC', [login, 'female', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Newest", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id DESC', [login, 'male', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Newest", me: req.session.login })
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND interest = ? AND fake = ? ORDER BY id DESC', [login, 'both', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Newest", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id DESC', [login, 'male', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Newest", me: req.session.login })
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY id DESC', [login, 'female', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Newest", me: req.session.login })
						})
					}
				}
			})
		}
		else
		{
			req.session.error = "You have to choose a profil picture before anything else."
			res.redirect('/profil');
		}
	}
	else
		res.redirect('/');
})

router.get('/match', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
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
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users INNER JOIN likes ON liker = login AND liked = ? WHERE gender = ? AND interest = ? AND fake = 0', [req.session.login, 'female', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Match them", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users INNER JOIN likes ON liked = login WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY users.id', [login, 'male', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Match them", me: req.session.login })
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users INNER JOIN likes ON liked = login WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY users.id', [login, 'both', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Match them", me: req.session.login })
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users INNER JOIN likes ON liked = login WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY users.id', [login, 'male', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Match them", me: req.session.login })
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online, lastconn FROM users INNER JOIN likes ON liked = login WHERE login != ? AND gender = ? AND interest = ? AND fake = ? ORDER BY users.id', [login, 'female', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Match them", me: req.session.login })
						})
					}
				}
			})
		}
		else
		{
			req.session.error = "You have to choose a profil picture before anything else."
			res.redirect('/profil');
		}
	}
	else
		res.redirect('/');
})

module.exports = router
