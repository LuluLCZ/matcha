var mysql = require('mysql');

var connection = mysql.createConnection({
	host	: '127.0.0.1',
	user	: 'connect',
	password: 'root',
	database: 'matcha',
	port	: 3307
});
connection.connect(function(err){
	if (!!err) {
		console.log('Error while connecting with database' + err);
	} else {
		console.log('Database is connected');
	}
});
module.exports = connection;