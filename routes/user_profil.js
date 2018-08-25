var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()
	
	router.use(fileUpload())


router.get('/:id', function(req, res, next) {
	if (req.session && req.session.login)
	{
		if (req.params.id)
		{
			var login = req.params.id
			if (login)
			{
				connect.query("SELECT * FROM block WHERE blocked = ? AND login = ?", [req.session.login, login], function(err, rows8, result) {
					if (err) console.log(err)
					if (!rows8[0]) {
						var queryString1 = "SELECT * FROM users WHERE login = ?"
						connect.query(queryString1, [login], function(err1, rows1, result1) {
							if (err1) throw err1;
							if (rows1)
							{
								console.log('ok ifi')
								queryString2 = "SELECT * FROM tags WHERE login = ?"
								connect.query(queryString2, [login], function(err2, rows2, result2) {
									if (err2) throw err2;
									if (rows2)
									{
										var tagReq = rows2
										var	fname = rows1[0].fname,
										lname = rows1[0].lname,
										gender = rows1[0].gender,
										age = rows1[0].age,
										interest = rows1[0].interest,
										sumup = rows1[0].sumup,
										city = rows1[0].city
										if (rows1[0].profpic)
											var profpic = rows1[0].profpic
										if (rows1[0].pic2)
											var pic2 = rows1[0].pic2
										if (rows1[0].pic3)
											var pic3 = rows1[0].pic3
										if (rows1[0].pic4)
											var pic4 = rows1[0].pic4
										if (rows1[0].pic5)
											var pic5 = rows1[0].pic5
										req.session.login2 = login
									}
									connect.query("SELECT * FROM block WHERE login = ? AND blocked = ?", [req.session.login, login], function(err, rows3, result) {
										if (err) console.log(err)
										console.log( 'ICI LA ICI '+req.session.login+' '+login+' rows '+rows3);
										if (rows3[0] != undefined)
										{
											var blocked = "yes"
										}
										else
										{
											var blocked = "no"
										}
										connect.query("SELECT liker FROM likes WHERE liker = ? AND liked = ?", [req.session.login, login], function(err5, rows5, result) {
											if (err5) console.log(err5)
											if (rows5[0] != undefined)
											{
												var liked = "yes"
											}
											else
											{
												var liked = "no"
											}
											res.render('user_profil', {title: login, login: req.session.login2, tagReq: tagReq, fname: fname, lname: lname, gender: gender, age: age, interest: interest, sumup: sumup, city: city, profpic: profpic, pic2: pic2, pic3: pic3, pic4: pic4, pic5: pic5, blocked: blocked, liked: liked})
										})
									})
								})
							}
						})
					}
					else {
						req.session.error = "This user blocked you. You can't neither contact or visit the profil of this user"
						res.redirect('/home')
					}
				})
			}
		}
	}
	else
	{
		req.session.error = "You need to be logged on to access this page."
		res.redirect('/');
	}
})

router.get('/block/:id', function(req, res, next) {
		if (req.session && req.session.login)
		{
			if (req.params.id)
			{
				var login = req.params.id
				if (login)
				{
					connect.query("SELECT * FROM block WHERE blocked = ? AND login = ?", [login, req.session.login], function(rows, err, result) {
						if (err) console.log(err)
						console.log('PUTE DE ROWS3')
						console.log(result)
						console.log(login)
						console.log(req.session.login)
						if (!rows)
						{
							queryString2 = "INSERT INTO block(login, blocked) VALUES (?, ?)"
							connect.query(queryString2, [req.session.login, login], function(rows, err, results) {
							if (err) console.log(err)
							res.redirect("/home")
						})
					}
					else
					{
						req.session.error = "This user is already blocked"
						res.redirect('/home')
					}
				})
			}
		}
	}
})

router.get('/unblock/:id', function(req, res, next) {
	if (req.session && req.session.login)
	{
		if (req.params.id)
		{
			var login = req.params.id
			if (login)
			{
				queryString2 = "DELETE FROM block WHERE login = ? AND blocked = ?"
				connect.query(queryString2, [req.session.login, login], function(rows, err, results) {
					if (err) console.log(err)
					res.redirect('/home')
				})
			}
			else
				res.redirect('/profil')
		}
	}
})

router.get('/like/:id', function(req, res, next) {
	if (req.session && req.session.login)
	{
		if (req.params.id)
		{
			var login = req.params.id
			if (login)
			{
				connect.query("SELECT * FROM likes WHERE liker = ? AND liked = ?", [login, req.session.login], function(rows, err, result) {
					if (err) console.log(err)
					console.log(rows)
					if (!rows)
					{
                        connect.query("INSERT INTO likes SET liker = ?, liked = ?", [req.session.login , login], function(err, result) {
						if (err) console.log(err)
						res.redirect("/home")
					})
				}
				else
				{
					req.session.error = "This user is already blocked"
					res.redirect('/home')
				}
			})
		}
	}
}
})

router.get('/unlike/:id', function(req, res, next) {
	if (req.session && req.session.login)
	{
		if (req.params.id)
		{
			var login = req.params.id
			if (login)
			{
				queryString2 = "DELETE FROM likes WHERE liker = ? AND liked = ?"
				connect.query(queryString2, [req.session.login, login], function(rows, err, results) {
					if (err) console.log(err)
					res.redirect('/home')
				})
			}
			else
				res.redirect('/profil')
		}
	}
})


module.exports = router