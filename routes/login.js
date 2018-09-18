var express = require('express'),
connect = require('../config/database.js'),
session = require('express-session'),
bcrypt = require('bcrypt'),
router = express.Router()

const saltRound = 10;

router.get('/', function(req, res, next) {
	res.render('login', { title: 'Login' })
})

router.post('/', function(req, res){
	var login = req.body.login,
		pswd = req.body.pswd

	if (login && pswd)
	{
		var queryString = "SELECT * FROM users WHERE login = ?";
		connect.query(queryString, [login], function(err, rows) {
			if (err) throw err;
			if (!rows[0])
			{
				req.session.error = "It looks like your login doesn't exists"
				res.redirect('/login')
				console.log("It looks like your login doesn't exists")
			}
			else if (bcrypt.compareSync(pswd, rows[0].pswd))
			{
				req.session.ok = true
				req.session.login = login
				req.session.fname = rows[0].fname
				req.session.lname = rows[0].lname
				req.session.email = rows[0].email
				req.session.city = rows[0].city
				req.session.age = rows[0].age
				req.session.interest = rows[0].interest
				req.session.gender = rows[0].gender
				req.session.success = "You are now logged."
				req.session.log = true
				req.session.isloggedon = true
				if (rows[0].sumup)
					req.session.sumup = rows[0].sumup
				if (rows[0].profpic)
					req.session.profpic = rows[0].profpic
				if (rows[0].pic2)
					req.session.pic2 = rows[0].pic2
				if (rows[0].pic3)
					req.session.pic3 = rows[0].pic3
				if (rows[0].pic4)
					req.session.pic4 = rows[0].pic4
				if (rows[0].pic5)
					req.session.pic5 = rows[0].pic5
				res.redirect('/home');
				console.log('ofddfsdfsdfdsfsdfefdfdsfsdfsk');
			}
			else
			{
				req.session.error = "It looks like your login and your password don't match, please try again with another combinaison";
				res.redirect('/login')
				console.log(rows);
				console.log(pswd, login);
				
			}
		})
	}
	else
	{
		req.session.error = "Please fill all the fields."
		res.redirect('/login')
	}
})

module.exports = router
