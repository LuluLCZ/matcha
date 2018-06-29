var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()

router.use(fileUpload())

router.get('/', function(req, res, next) {
	res.render('profil', { title: 'Profil' })
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

		console.log(fileupl)
	
		if (fileupl.mimetype == "image/jpeg" ||fileupl.mimetype == "image/png")
		{
			fileupl.mv('/public/images/'+filename, function(err) {
				if (err){
					req.session.error = "An error occured.";
					res.redirect('/profil');
				}
				if (req.params.id == 1)
				{
					var queryString1 = "UPDATE users SET mainpic = ? WHERE login = ?";
					connect.query(queryString1, [filename, req.session.login], function(err) {
						if (err) console.log(err);
						req.session.success = "Your mainpic have been uploaded successfully."
						res.redirect('/profil');
						})
				}
			})
		}
})

module.exports = router
