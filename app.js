var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connect = require('./config/database.js')
var bodyParser = require('body-parser');
var session = require('express-session');




var app = express();
var server = require('http').createServer(app);
app.io = require('socket.io')(server)
// app.use(app.router);
// routes.initialize(app);

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
		profil = require('./routes/profil')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session)

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
	next()
})



// Routes
app.use('/', index)
app.use('/register', register)
app.use('/login', login)
app.use('/home', home)
app.use('/profil', profil)
app.use('/logout', logout)




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	next(createError(404));
// });


// error handler
// app.use(function(err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};
	
// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });



module.exports = app;
