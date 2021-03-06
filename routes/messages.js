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
			connect.query('SELECT slogin FROM matching WHERE flogin = ?', [login], function(err, row, result) {
				if (err) console.log(err)
				if (row)
				{
					var slogin = row.slogin
					connect.query('SELECT login, gender, fname, lname, age, interest, sumup, profpic, online FROM users INNER JOIN matching ON login = slogin WHERE flogin = ?', [login], function(err, rows) {
						if (err) console.log(err)
							var profil = rows
							res.render('matches', { title: 'Matches', profil: profil })
					})
				}
				else
					res.redirect('/');
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

router.get('/:id', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
		{
			var sendto = req.params.id;
			connect.query('SELECT * FROM block WHERE blocked = ? AND login = ?', [req.session.login, sendto], (err, rows) => {
				if (rows[0])
				{
					req.session.error = "This user blocked you can't chat with him anymore"
					res.redirect('/messages');
				}
				else
				{
					connect.query('SELECT * FROM matching WHERE flogin = ? AND slogin = ?', [req.session.login, sendto], (err, rows1) => {
						if (err) throw err
						if (!rows1[0])
						{
							req.session.error = "You didn't connect with " + sendto + ", you can't chat with this user.";
							res.redirect('/home');
						}
						else
						{
							connect.query('SELECT * FROM messages WHERE (login = ? AND sendto = ?) OR (login = ? AND sendto = ?) ORDER BY id DESC', [sendto, req.session.login, req.session.login, sendto], function(err, row, result) {
								if (err) console.log(err)
								res.render('messages', {title : 'Messages', me: req.session.login, sendto: sendto, message: row})
							})
						}
					})
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
