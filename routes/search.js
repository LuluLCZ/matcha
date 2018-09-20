var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()

router.get('/', function(req, res) {
	res.render('search', {title: 'Search'});
})

router.get('/login', function(req, res) {
	if (req.session && req.session.login)
	{
		var login = req.query.login;
		if (req.session.profpic)
		{
			res.redirect('/user_profil/'+login);
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
				age = req.query.age,
				interest = req.session.interest
				sumup = req.session.sumup
			connect.query('SELECT * FROM users WHERE login != ?', [login], function(err, row, result) {
				if (err) console.log(err)
				console.log(age);
				if (row.lenght != 0) {
					if (interest == 'female' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND age >= ? ORDER BY popu DESC', [login, 'female', 'male', 0, age], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND age >= ? ORDER BY popu DESC', [login, 'male', 'female', 0, age], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND interest = ? AND fake = ? AND age >= ? ORDER BY popu DESC', [login, 'both', 0, age], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND age >= ? ORDER BY popu DESC', [login, 'male', 'male', 0, age], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND age >= ? ORDER BY popu DESC', [login, 'female', 'female', 0, age], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
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

router.get('/city', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
		{
			var login = req.session.login,
				gender = req.session.gender,
				age = req.session.age,
				interest = req.session.interest
				sumup = req.session.sumup
				city = req.query.city
			connect.query('SELECT * FROM users WHERE login != ?', [login], function(err, row, result) {
				if (err) console.log(err)
				if (row.lenght != 0) {
					if (interest == 'female' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND city = ? ORDER BY age', [login, 'female', 'male', 0, city], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND city = ? ORDER BY age', [login, 'male', 'female', 0, city], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND interest = ? AND fake = ? AND city = ? ORDER BY age', [login, 'both', 0, city], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND city = ? ORDER BY age', [login, 'male', 'male', 0, city], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users WHERE login != ? AND gender = ? AND interest = ? AND fake = ? AND city = ? ORDER BY age', [login, 'female', 'female', 0, city], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search"})
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

router.get('/tag', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
		{
			var login = req.session.login,
				gender = req.session.gender,
				age = req.session.age,
				interest = req.session.interest
				sumup = req.session.sumup
				tag = req.query.tag
			connect.query('SELECT * FROM users WHERE login != ?', [login], function(err, row, result) {
				if (err) console.log(err)
				if (row.lenght != 0) {
					if (interest == 'female' && gender == 'male') {
						connect.query('SELECT users.login, users.gender, users.fname, users.lname, users.age, users.interest, users.sumup, users.profpic, users.online FROM users INNER JOIN tags ON tags.login = users.login WHERE tags.tag = ? AND users.login != ? AND users.gender = ? AND users.interest = ? AND users.fake = ?', [tag, login, 'female', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search" })
						})
					}
					else if (interest == 'male' && gender == 'female') {
						connect.query('SELECT users.login, users.gender, users.fname, users.lname, users.age, users.interest, users.sumup, users.profpic, users.online FROM users INNER JOIN tags ON tags.login = users.login WHERE tags.tag = ? AND users.login != ? AND users.gender = ? AND users.interest = ? AND users.fake = ?', [tag, login, 'male', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search" })
						})
					}
					else if (interest == 'both') {
						connect.query('SELECT users.login, users.gender, users.fname, users.lname, users.age, users.interest, users.sumup, users.profpic, users.online FROM users INNER JOIN tags ON tags.login = users.login WHERE tags.tag = ? AND users.login != ? AND users.interest = ? AND users.fake = ?', [tag, login, 'both', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search" })
						})
					}
					else if (interest == 'male' && gender == 'male') {
						connect.query('SELECT users.login, users.gender, users.fname, users.lname, users.age, users.interest, users.sumup, users.profpic, users.online FROM users INNER JOIN tags ON tags.login = users.login WHERE tags.tag = ? AND users.login != ? AND users.gender = ? AND users.interest = ? AND users.fake = ?', [tag, login, 'male', 'male', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search" })
						})
					}
					else if (interest == 'female' && gender == 'female') {
						connect.query('SELECT users.login, users.gender, users.fname, users.lname, users.age, users.interest, users.sumup, users.profpic, users.online FROM users INNER JOIN tags ON tags.login = users.login WHERE tags.tag = ? AND users.login != ? AND users.gender = ? AND users.interest = ? AND users.fake = ?', [tag, login, 'female', 'female', 0], function(err, row) {
							if (err) console.log(err)
							var profil = row
							res.render('home', { title: 'Home', profil: profil, filter: "Search" })
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
