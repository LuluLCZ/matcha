var express = require('express')
var router = express.Router()
var connect = require('../config/database.js')
var session = require('express-session')

router.get('/', function(req, res) {
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function getRandItem(items) {
		return items[Math.floor(Math.random()*items.length)];
	}

	function name() {
		var name = "",
			char = "abcdefghijklmnopqrstuvwxyz",
			i = 0;
		while (i < 7)
		{
			name += char.charAt(getRandomInt(26));
			i++;
		}
		return name;
	}

	function tag() {
		var tag = "",
			char = "abcdef",
			i = 0;
		
		while (i < 5)
		{
			tag += char.charAt(getRandomInt(6));
			i++;
		}
		return tag;
	}

	connect.query('SELECT * FROM users WHERE login = ?', ['user1'], (err, rows) => {
		if (err) throw err
		if (!rows[0])
		{
			var i = 0,
				genderArray = ["male", "female"],
				interestArray = ["male", "female", "both"],
				profpicArray1 = ["1.png", "2.png", "3.png", "4.png", "10.png", "11.png", "12.png"],
				profpicArray2 = ["5.png", "6.png", "7.png", "8.png", "9.png"]
			while (i < 650)
			{
				var login = 'user'+i,
					fname = name(),
					lname = name(),
					gender = getRandItem(genderArray)
					email = 'user'+i+'@gmail.com',
					city = 'Paris',
					age = getRandomInt(55) + 18,
					interest = getRandItem(interestArray)
					pswd = '$2b$10$pYjQdnBcH.4gRK.LzphiBOeOs1Re/CNJYKUTAf9DwhW8NKhR03QCK'
				if (gender == 'male')
				{
					var profpic = getRandItem(profpicArray1)
				}
				else
				{
					var profpic = getRandItem(profpicArray2)
				}
				var sumup = "Heyo je suis user "+i,
					online = 0,
					popu = getRandomInt(2000),
					hash = '$2b$10$a6b2ksVov0T2P16Zv9GbSupMGUlFVgukJZJFA0xJRp5Zn5A94Ex.'
					confirm = 1,
					fake = 0,
					latitude = 48.8534,
					longitude = 2.3488
				connect.query('INSERT INTO users SET login = ?, gender = ?, fname = ?, lname = ?, pswd = ?, email = ?, city = ?, age = ?, interest = ?, profpic = ?, sumup = ?, online = ?, popu = ?, hash = ?, confirm = ?, fake = ?, latitude = ?, longitude = ?', 
								[login, gender, fname, lname, pswd, email, city, age, interest, profpic, sumup, online, popu, hash, confirm, fake, latitude, longitude], (err) => {
									if (err) throw err;
								})
				var tag1 = tag(),
					tag2 = tag(),
					tag3 = tag(),
					tag4 = tag()
				connect.query('INSERT INTO tags SET login = ?, tag = ?', [login, tag1], (err) => {
					if (err) throw err;
				})
				connect.query('INSERT INTO tags SET login = ?, tag = ?', [login, tag2], (err) => {
					if (err) throw err;
				})
				connect.query('INSERT INTO tags SET login = ?, tag = ?', [login, tag3], (err) => {
					if (err) throw err;
				})
				connect.query('INSERT INTO tags SET login = ?, tag = ?', [login, tag4], (err) => {
					if (err) throw err;
				})
				i++
			}
		}
		res.redirect('/home');
	})
})

module.exports = router