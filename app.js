var express = require('express')
, http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connect = require('./config/database.js')
var bodyParser = require('body-parser');
var session = require('express-session');
var socketIOSession = require("socket.io.session");
var requestIp = require('request-ip');

app.io = require('socket.io')(server, {pingInterval: 10000,
	pingTimeout: 50000,});


var		session = require("express-session")({
	secret: "i901884384jdowkkd",
	resave: true,
	saveUninitialized: true
})

var		index = require('./routes/index'),
		register = require('./routes/register'),
		login = require('./routes/login'),
		home = require('./routes/home'),
		logout = require('./routes/logout'),
		profil = require('./routes/profil'),
		user_profil = require('./routes/user_profil'),
		matches = require('./routes/matches'),
		notifs = require('./routes/notifs'),
		messages = require('./routes/messages'),
		confirm = require('./routes/confirm'),
		forget = require('./routes/forget'),
		newpass = require('./routes/newpass'),
		fake = require('./routes/fake'),
		search = require('./routes/search')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session)
app.use(requestIp.mw())

app.use(function (req, res, next) {
	if (req.session) {
		if (req.session.error) {
			res.locals.error = req.session.error
			req.session.error = undefined
		}
		if (req.session.success) {
			res.locals.success = req.session.success
			req.session.success = undefined
		}
		if (req.session.warning) {
			res.locals.warning = req.session.warning
			req.session.warning = undefined
		}
		if (req.session.info) {
			res.locals.info = req.session.info
			req.session.info = undefined
		}
	}
	next()
})

app.use(function(req, res, next) {
	res.io = app.io
	res.locals.ok = req.session.ok
	global.me = req.session.login
	res.locals.login = req.session.login
	res.locals.gender = req.session.gender
	res.locals.fname = req.session.fname
	res.locals.lname = req.session.lname
	res.locals.email = req.session.email
	res.locals.city = req.session.city
	res.locals.age = req.session.age
	res.locals.interest = req.session.interest
	res.locals.isloggedon = req.session.isloggedon
	res.locals.profpic = req.session.profpic
	res.locals.pic2 = req.session.pic2
	res.locals.pic3 = req.session.pic3
	res.locals.pic4 = req.session.pic4
	res.locals.pic5 = req.session.pic5
	res.locals.sumup = req.session.sumup
	res.locals.log = req.session.log
	next()
})



// Routes
app.use('/', index)
app.use('/register', register)
app.use('/login', login)
app.use('/home', home)
app.use('/profil', profil)
app.use('/logout', logout)
app.use('/user_profil', user_profil)
app.use('/matches', matches)
app.use('/notifs', notifs)
app.use('/messages', messages)
app.use('/confirm', confirm)
app.use('/forget', forget)
app.use('/reset', newpass)
app.use('/fake', fake)
app.use('/search', search)

var people = {}
app.io.on('connection', function(socket) {
	console.log('A New user is connected')
	var me = false
	socket.on('log', function(users) {
		console.log('User '+users.login+' is now connected')
		connect.query('UPDATE users SET online = 1 WHERE login = ?', [users.login], function(err) {
			if (err) throw err
			people[users.login] = socket.id
		})
	});
	socket.on('connectionne', function(users) {
		console.log('User '+users.login+' is now connected')
			people[users.login] = socket.id
	});
	socket.on('newmsg', function(message){
		if (message == '')
			return false
		message.user = message.usr
		date = new Date()
		message.h = date.getHours()
		message.m = date.getMinutes()
		connect.query('INSERT INTO messages SET login = ?, sendat = ?, sendto = ?, content = ?', [message.usr, date, message.recup, message.message], (err) => {
			var notifmsg = message.usr + ' Vous a envoye un message'
			connect.query('INSERT INTO notifs SET sent = ?, received = ?, date = ?, content = ?, readed = 0', [message.usr, message.recup, date, notifmsg], (err) => {
				if (err) console.log(err)
				io.to(people[message.recup]).emit('newmsgs', {
					name: message.usr,
					message: message.message,
					h: message.h,
					m: message.m,
					recup: message.recup
				})
				io.to(people[message.recup]).emit('notif');
			})
		})
	});
	socket.on('disconnect', function () {
		console.log('disconnect')
		if (!me) {
			return false
		}
		connect.query("UPDATE users SET online = 0 WHERE login = ?", [me], (err) => {
			if (err) threw (err)
		})
		console.log('User '+users.login+' is now disconnected')
  	});
})
global.people = people
global.io = app.io


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



module.exports = app;
