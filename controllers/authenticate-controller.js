var connection = require('./../config');
var bcrypt = require('bcrypt');


module.exports.authenticate = function(req, res) {
	var email = req.body.email;
	var passwd= req.body.passwd;

	connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fiels) {
		if (error) {
			res.json({
				status: false,
				message: 'there are some error with the query'
			})
		} else {
			if (result.lenght >0) {
				bcrypt.compare(passwd, results[0].passwd, function(err, ress) {
					if (!ress) {
						res.json({
							status: false,
							message: 'Email and password doesn\'t match'
						});
					} else {
						res.json({
							status: true,
							message: 'Successfully authenticated'
						})
					}
				});
			}
			else {
				res.json({
					status: false,
					message: 'Email does not exists'
				});
			}
		}
	});
}