let mysql = require('mysql');

let connexion = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'toor',
	password: 'poutre',
	database: 'matcha'
});

connexion.connect();

module.exports = connexion;