var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()

router.use(fileUpload())

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

router.get('/deltag/sdf', function(req, res) {
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
			req.session.success = "Votre tag a bien été ajouté";
			res.redirect('/profil');
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
