var connection = require('./../config');
var bcrypt = require('bcrypt');

// var salt = bcrypt.genSaltSync(10);

module.exports.register = function(req, res) {
	var today = new Date();
	var users = {
		'fname':req.body.fname,
		'lname':req.body.lname,
		'email':req.body.email,
		'passwd':req.body.passwd,
		'created_at':today,
		'updated_at':today,
		'gender':req.body.gender,
		'looking_for':req.body.looking_for,
		'sumup':req.body.sumup
	}
	
	connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
		if (error) {
			res.json({
				status: false,
				message: 'there are some error with the query' + error
			})
		} else {
			res.json({
				status: true,
				data: results,
				message: 'user registered successfully'
			})
		}
	});
}