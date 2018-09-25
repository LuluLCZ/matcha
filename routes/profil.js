var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var bcrypt = require('bcrypt')
var router = express.Router()

console.log('coucou1');
router.use(fileUpload())
console.log('coucou2');
const saltRound = 10;

router.get('/', function(req, res, next) {
	if (req.session && req.session.login)
	{
		var queryStringTag = "SELECT tag FROM tags WHERE login = ?";
		connect.query(queryStringTag, [req.session.login], function(err, rows) {
			if (err) console.log(err);
			connect.query("SELECT popu FROM users WHERE login = ?", [req.session.login], function(err, rows1) {
				if (err) throw err
				res.locals.tag = rows
				res.render('profil', { title: 'Profil', popularity: rows1[0].popu })
			})
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
	var sumup = req.body.sumup.trim(),
		tag = req.body.tag.trim()

	var RegexSumup = /^([A-Za-z0-9\s\.\,]){10,350}$/gm
	var RegexTag = /^([A-Za-z0-9]){2,12}$/gm
	if (sumup && sumup.search(RegexSumup) == -1)
	{
		req.session.error = "Your sumup should contain between 10 and 350 characters, and only alphabet letters and numbers including '.' and ','."
		res.redirect('/profil')
	}
	else if (sumup && sumup.search(RegexSumup) != -1)
	{
		var queryString = "UPDATE users SET sumup = ? WHERE login = ?";
		connect.query(queryString, [sumup, req.session.login], function(err) {
			if (err) throw err;
			req.session.sumup = sumup;
			res.redirect('/profil');
		})
	}
	else if (tag && tag.search(RegexTag) != -1)
	{
		var queryStringtag = "INSERT INTO tags(login, tag) VALUES(?, ?)";
		connect.query(queryStringtag, [req.session.login, tag], function(err) {
			if (err) console.log(err);
			req.session.success = "Your tag(s) have been added successfully";
			res.redirect('/profil');
		})
	}
	else if (tag && tag.search(RegexTag) == -1)
	{
		req.session.error = "Your tag should contain between 2 and 12 characters, and only alphabet letters and numbers."
		res.redirect('/profil')
	}
	else
		res.redirect('/profil')
})

router.post('/edit_pail', function(req, res) {
	var cpasswd = req.body.cpasswd.trim(),
		npasswd = req.body.npasswd.trim(),
		vnpasswd = req.body.vnpasswd.trim(),
		nmail = req.body.nmail.trim(),
		nlogin = req.body.nlogin.trim()

	var RegexLogin = /^([A-Za-z0-9]){4,12}$/gm
	var RegexPw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm
	if (cpasswd && npasswd && vnpasswd)
	{
		connect.query("SELECT pswd FROM users WHERE login = ?", [req.session.login], (err, rows1) => {
			var npasswdhash = bcrypt.hashSync(npasswd, saltRound)
			if (bcrypt.compareSync(cpasswd, rows1[0].pswd))
			{
				if (npasswd == vnpasswd && npasswd.search(RegexPw) != - 1)
				{
					var queryString = "UPDATE users SET pswd = ? WHERE login = ?";
					connect.query(queryString, [npasswdhash, req.session.login], (err) => {
						if (err) throw err
						req.session.success = "Your passord has been changed successfully"
						res.redirect('/profil')
					})
				}
				else
				{
					req.session.error = "Your passwd sould contain at least 8char, one uper case, one lower case and one digit."
					res.redirect('/profil');
				}
			}
			else
			{
				req.session.error = "Your current password is not good"
				res.redirect('/profil');
			}
		})
	}
	else if (nmail)
	{
		connect.query("SELECT * FROM users WHERE email = ?", [nmail], function(err, rows, result) {
			if (rows[0])
			{
				req.session.error = "The mail is already taken, please try another one"
				res.redirect('/profil')
			}
			else
			{
				var queryStringMail = "UPDATE users SET email = ? WHERE login = ?"
				connect.query(queryStringMail, [nmail, req.session.login], function(err) {
					if (err) throw err
					req.session.success = "Your email has been changed successfully";
					req.session.login = nlogin
					res.redirect('/profil')
				})
			}
		})
	}
	else if (nlogin)
	{
		if (nlogin.search(RegexLogin) == -1)
		{
			req.session.error = "Your login should only contain letters and number and must contain between 4 and 12 chars."
			res.redirect('/profil');
		}
		else
		{
			connect.query("SELECT * FROM users WHERE login = ?", [nlogin], function(err, rows, result) {
				if (err) throw err;
				if (rows[0])
				{
					req.session.error = "The login is already taken, please try another one"
					res.redirect('/profil')
				}
				else
				{
					var queryStringLogin = "UPDATE users SET login = ? WHERE login = ?"
					connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
						if (err) throw err
						
						var queryStringLogin = "UPDATE tags SET login = ? WHERE login = ?"
						connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
							if (err) throw err
							
							var queryStringLogin = "UPDATE notifs SET sent = ? WHERE sent = ?"
							connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
								if (err) throw err
								var queryStringLogin = "UPDATE notifs SET received = ? WHERE received = ?"
								connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
									if (err) throw err

									var queryStringLogin = "UPDATE messages SET login = ? WHERE login = ?"
									connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
										if (err) throw err
										var queryStringLogin = "UPDATE messages SET sendto = ? WHERE sendto = ?"
										connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
											if (err) throw err

											var queryStringLogin = "UPDATE matching SET flogin = ? WHERE flogin = ?"
											connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
												if (err) throw err
												var queryStringLogin = "UPDATE matching SET slogin = ? WHERE slogin = ?"
												connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
													if (err) throw err
													
													var queryStringLogin = "UPDATE likes SET liker = ? WHERE liker = ?"
													connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
														if (err) throw err
														var queryStringLogin = "UPDATE likes SET liked = ? WHERE liked = ?"
														connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
															if (err) throw err
					
															var queryStringLogin = "UPDATE block SET blocked = ? WHERE blocked = ?"
															connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
																if (err) throw err
																var queryStringLogin = "UPDATE block SET login = ? WHERE login = ?"
																connect.query(queryStringLogin, [nlogin, req.session.login], function(err) {
																	if (err) throw err
																	req.session.success = "Your login has been changed successfully";
																	req.session.login = nlogin
																	res.redirect('/home')
																})
															})
														})
													})
												})
											})
										})
									})
								})
							})
						})
					})
				}
			})
		}
	}
	else
		res.redirect('/profil')
})

router.post('/edit_info', function(req, res) {
	var fname = req.body.fname.trim(),
		lname = req.body.lname.trim(),
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
	else
		res.redirect('/profil')
})

console.log('coucou');

router.post('/upload_pic/:id', function(req, res) {
	console.log('coucou3');
	var fileupl = req.files.uploaded_image
	
	

		console.log('got here : ' + fileupl);
		if ((fileupl) && (fileupl.mimetype == "image/jpeg" ||fileupl.mimetype == "image/png" || fileupl.mimetype == "image/jpg"))
		{
			filename = fileupl.name
			fileupl.mv('public/images/'+filename, function(err) {
				if (err)
				{
					console.log(err)
					req.session.error = "An error occured.";
					res.redirect('/profil');
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
		else
		{
			req.session.error = "Don't try to mess my matcha"
			res.redirect('/profil')
		}
})

module.exports = router
