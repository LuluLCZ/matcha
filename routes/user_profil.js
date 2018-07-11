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
				var queryString1 = "SELECT * FROM users WHERE login = ?"
				connect.query(queryString1, [login], function(err1, rows1, result1) {
					if (err1) throw err1;
					if (rows1)
					{
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
							res.render('user_profil', {title: login, login: req.session.login2, tagReq: tagReq, fname: fname, lname: lname, gender: gender, age: age, interest: interest, sumup: sumup, city: city, profpic: profpic, pic2: pic2, pic3: pic3, pic4: pic4, pic5: pic5})
						})
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

module.exports = router