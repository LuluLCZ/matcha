var express = require('express')
var router = express.Router()
var connect = require('../config/database.js')
var session = require('express-session')
var nodemailer = require('nodemailer')

router.get('/', function(req, res, next) {
	res.render('forget', { title: 'Forget' })
})

router.post('/', function(req, res) {
	var email = req.body.email.toLowerCase();

	connect.query("SELECT hash FROM users WHERE email = ?", [email], function(err, rows) {
		if (err) throw err
		if (!rows[0])
		{
			req.session.error = "This email is not registered to any account, please try another one or create an account with it"
			res.redirect('/home');
		}
		else
		{
			var transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
				  user: 'matchabylacaze@gmail.com',
				  pass: 'Poutrelle123'
				}
			  });
			  
			  var mailOptions = {
				from: 'matchabylacaze@gmail.com',
				to: email,
				subject: 'Welcome to Matcha !',
				text: 'Your link to reinitialize your password is : '+'http://localhost:3306/reset/'+rows[0].hash
			  };
			  
			  transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				  console.log(error);
				} else {
				  console.log('Email sent: ' + info.response);
				}
			  });
			  req.session.info = "You received a mail with a link to reinitialized your password."
			res.redirect('/home');
		}
	})
})

module.exports = router