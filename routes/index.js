var express = require('express'),
router = express.Router()

router.get('/', function(req, res) {
	if (req.session && req.session.login) {
		req.session.error = "You can't access this page anymore"
		res.redirect('/home');
	}
	else
		res.render('index', { title: 'Express' })
})

module.exports = router
