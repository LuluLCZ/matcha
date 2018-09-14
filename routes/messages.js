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
		connect.query('SELECT slogin FROM matching WHERE flogin = ?', [login], function(err, row, result) {
			if (err) console.log(err)
			if (row)
			{
				var slogin = row.slogin
				connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic FROM users INNER JOIN matching ON login = slogin WHERE flogin = ?', [login], function(err, rows) {
					if (err) console.log(err)
					console.log(result)
					var profil = rows
					res.render('messages', { title: 'Messages', profil: profil })
				})
			}
			else
				res.redirect('/');
		})
	}
	else
		res.redirect('/');
})

router.get('/:id', function(req, res) {
	if (req.session && req.session.login)
	{
		var sendto = req.params.id;
		connect.query('SELECT * FROM messages WHERE (login = ? AND sendto = ?) OR (login = ? AND sendto = ?) ORDER BY id DESC', [sendto, req.session.login, req.session.login, sendto], function(err, row, result) {
			if (err) console.log(err)
			console.log('sendto '+sendto)
				res.render('messages', {title : 'Messages', me: req.session.login, sendto: sendto, message: row})
		})
	}
	else
		res.redirect('/');
})

module.exports = router
