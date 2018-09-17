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

			connect.query("SELECT * FROM notifs WHERE received = ?", [login], function(err, rows) {
				if (err) throw err
				if (rows[0] != undefined)
				{
					slogin = rows.sent
					connect.query('SELECT login, profpic, content, date FROM users INNER JOIN notifs ON login = sent WHERE received = ? ORDER BY notifs.id DESC', [login], function(err, rows2) {
						if (err) console.log(err)
						var profil = rows2
						connect.query("UPDATE notifs SET readed = ? WHERE received = ?", [1, req.session.login], function(err) {
							if (err) throw err
							res.render('notifs', { title: 'Notifs', profil: profil })
						})
					})
				}
				else
				{
					req.session.info = "You don't have any new notification."
					res.redirect('/home')
				}
			})
	}
	else
		res.redirect('/');
})

module.exports = router