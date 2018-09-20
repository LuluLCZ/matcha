var express = require('express')
var session = require('express-session')
var connect = require('../config/database.js')
var fileUpload = require('express-fileupload')
var router = express.Router()

router.post('/:id', function(req, res) {
	if (req.session && req.session.login)
	{
		if (req.session.profpic)
		{
			var login = req.params.id
				reason = req.body.reason
			
			console.log(reason)
			if (reason)
			{
				connect.query("SELECT * FROM fake WHERE fake = ? AND login = ?", [login, req.session.login], function(err, rows) {
					if (err) throw err
					if (!rows[0])
					{
						if (rows[5])
						{
							connect.query("UPDATE users SET fake = 1 WHERE login = ?", [login], function(err) {
								if (err) throw err;
								req.session.success = "This user has been blocked form our website till we have any proof that's not a fake".
								res.redirect('/home');
							})
						}
						else
						{
							connect.query("INSERT INTO fake SET fake = ?, login = ?, reason = ?", [login, req.session.login, reason], function(err, rows) {
								if (err) throw err
								req.session.success = "This user has been reported as fake, the administration will look into it."
								res.redirect('/home');
							})
						}
					}
					else
					{
						req.session.error = "You can't report twice a person as fake."
						res.redirect('/home')
					}
				})
			}
			else
			{
				req.session.error = "An error occured"
				res.redirect('/home');
			}
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