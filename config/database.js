var mysql = require('mysql');

var connexion = mysql.createConnection({
	host: 'localhost',
	port: 3307,
	user: 'connect',
	database: 'matcha'
});

connexion.connect();

module.exports = connexion;