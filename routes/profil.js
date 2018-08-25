var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var bcrypt = require('bcrypt')
var router = express.Router()

router.use(fileUpload())

const saltRound = 10;

router.get('/', function(req, res, next) {
	if (req.session && req.session.login)
	{
		var queryStringTag = "SELECT tag FROM tags WHERE login = ?";
		connect.query(queryStringTag, [req.session.login], function(err, rows) {
			if (err) console.log(err);
			res.locals.tag = rows
			res.render('profil', { title: 'Profil' })
		})
	}
	else
	{
		req.session.error = "You need to be logged on to access this page."
		res.redirect('/');
	}

})

router.get('/deltag/:tag', function(req, res) {
	if (req.session && req.session.login)
	{
		var tag = req.params.tag
		if (tag)
		{
			var queryStringTag = "SELECT tag FROM tags WHERE login = ? AND tag = ?";
			connect.query(queryStringTag, [req.session.login, tag], function(err, rows) {
				if (err) console.log(err);
				if (rows[0].tag) {
					var queryStringDelTag = "DELETE FROM tags WHERE login = ? AND tag = ?";
					connect.query(queryStringDelTag, [req.session.login, tag], function(err) {
						if (err) console.log(err);
						req.session.success = "Your tag has been successfully deleted."
						res.redirect('/profil')
					})
				}
			})
		}
	}
	else
	{
		req.session.error = "You need to be logged on to access this page."
		res.redirect('/');
	}
})

router.post('/tag_sumup', function(req, res) {
	var sumup = req.body.sumup,
		tag = req.body.tag

		console.log(sumup);
	if (sumup)
	{
		var queryString = "UPDATE users SET sumup = ? WHERE login = ?";
		connect.query(queryString, [sumup, req.session.login], function(err) {
			if (err) throw err;
			req.session.sumup = sumup;
			res.redirect('/profil');
		})
	}
	else if (tag)
	{
		var queryStringtag = "INSERT INTO tags(login, tag) VALUES(?, ?)";
		connect.query(queryStringtag, [req.session.login, tag], function(err) {
			if (err) console.log(err);
			req.session.success = "Your tag(s) have been added successfully";
			res.redirect('/profil');
		})
	}
})

router.post('/edit_pail', function(req, res) {
	var cpasswd = req.body.cpasswd,
		npasswd = req.body.npasswd,
		vnpasswd = req.body.vnpasswd,
		nmail = req.body.nmail,
		nlogin = req.body.nlogin

		if (cpasswd && npasswd && vnpasswd)
		{
			npasswdhash = bcrypt.hashSync(npasswd, saltRound)
			var queryString = "UPDATE users SET pswd = ? WHERE login = ?";
			connect.query(queryString, [npasswdhash, req.session.login], function (err) {
				if (err) throw err
				req.session.success = "Your passord has been changed successfully"
				res.redirect('/home')
			})
		}
		else if (nmail)
		{
			connect.query("SELECT * FROM users WHERE email = ?", [nmail], function(err, rows, result) {
				if (!rows[0] != null)
				{
					req.session.error = "The mail is already taken, please try another one"
					res.redirect('/home')
				}
				else
				{
					var queryStringMail = "UPDATE users SET email = ? WHERE login = ?"
					connect.query(queryStringMail, [nmail, req.session.login], function(err) {
						if (err) throw err
						req.session.success = "Your email has been changed successfully";
						req.session.login = nlogin
						res.redirect('/home')
					})
				}
			})
		}
		else if (nlogin)
		{
			connect.query("SELECT * FROM users WHERE login = ?", [nlogin], function(err, rows, result) {
				if (err) throw err;
				console.log("REGARDER ICI"+ rows);
				if (rows[0])
				{
					req.session.error = "The login is already taken, please try another one"
					res.redirect('/home')
				}
				else
				{
					var queryStringLogin = "UPDATE users SET login = ? WHERE login = ?"
					connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
						if (err) throw err
						req.session.success = "Your login has been changed successfully";
						req.session.login = nlogin
						res.redirect('/home')
					})
				}
			})
		}
})

router.post('/edit_info', function(req, res) {
	var fname = req.body.fname,
		lname = req.body.lname,
		gender = req.body.gender,
		interest = req.body.interest

	if (fname)
	{
		var queryString = "UPDATE users SET fname = ? WHERE fname = ? AND login = ?";
		connect.query(queryString, [fname, req.session.fname, req.session.login], function(err, results) {
			if (err) throw err;
			req.session.fname = fname;
			res.redirect('/profil');
		})
	}
	else if (lname)
	{
		var queryString = "UPDATE users SET lname = ? WHERE lname = ? AND login = ?";
		connect.query(queryString, [lname, req.session.lname, req.session.login], function(err, results) {
			if (err) throw err;
			req.session.lname = lname;
			res.redirect('/profil');
		})
	}
	else if (gender)
	{
		var queryString = "UPDATE users SET gender = ? WHERE login = ?";
		connect.query(queryString, [gender, req.session.login], function(err, results) {
			if (err) throw err;
			req.session.gender = gender;
			res.redirect('/profil');
		})
	}
	else if (interest)
	{
		var queryString = "UPDATE users SET interest = ? WHERE login = ?";
		connect.query(queryString, [interest, req.session.login], function(err, results) {
			if (err) throw err;
			req.session.interest = interest;
			res.redirect('/profil');
		})
	}
})

router.post('/upload_pic/:id', function(req, res) {
	var fileupl = req.files.uploaded_image,
		filename = fileupl.name

		// console.log(fileupl)
	
		if (fileupl.mimetype == "image/jpeg" ||fileupl.mimetype == "image/png" || fileupl.mimetype == "image/jpg")
		{
			fileupl.mv('public/images/'+filename, function(err) {
				if (err)
				{
					console.log(err)
					req.session.error = "An error occured.";
					res.redirect('/home');
				}
				if (req.params.id == 1)
				{
					var queryString1 = "UPDATE users SET profpic = ? WHERE login = ?";
					connect.query(queryString1, [filename, req.session.login], function(err) {
						if (err) throw(err);
						req.session.success = "Your mainpic have been uploaded successfully."
						req.session.profpic = filename
						res.redirect('/profil');
						})
				}
				else if (req.params.id == 2)
				{
					var queryString2 = "UPDATE users SET pic2 = ? WHERE login = ?";
					connect.query(queryString2, [filename, req.session.login], function(err) {
						if (err) throw(err);
						req.session.success = "Your mainpic have been uploaded successfully."
						req.session.pic2 = filename
						res.redirect('/profil');
						})
				}
				else if (req.params.id == 3)
				{
					var queryString3 = "UPDATE users SET pic3 = ? WHERE login = ?";
					connect.query(queryString3, [filename, req.session.login], function(err) {
						if (err) throw(err);
						req.session.success = "Your mainpic have been uploaded successfully."
						req.session.pic3 = filename
						res.redirect('/profil');
						})
				}
				else if (req.params.id == 4)
				{
					var queryString4 = "UPDATE users SET pic4 = ? WHERE login = ?";
					connect.query(queryString4, [filename, req.session.login], function(err) {
						if (err) throw(err);
						req.session.success = "Your mainpic have been uploaded successfully."
						req.session.pic4 = filename
						res.redirect('/profil');
						})
				}
				else if (req.params.id == 5)
				{
					var queryString1 = "UPDATE users SET pic5 = ? WHERE login = ?";
					connect.query(queryString1, [filename, req.session.login], function(err) {
						if (err) throw(err);
						req.session.success = "Your mainpic have been uploaded successfully."
						req.session.pic5 = filename
						res.redirect('/profil');
						})
				}
			})
		}
})

module.exports = router
