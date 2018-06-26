var express = require('express'),
    connect = require('../config/database.js'),
    session = require('express-session'),
    bcrypt = require('bcrypt'),
    regex = require('regex-email'),
    iplocation = require('iplocation'),
    ageCalc = require('age-calculator'),
    parse = require('parse').parse,
    router = express.Router()

    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
      });

      router.post('/', function(req, res) {
          //Recuprer toutes les variables de la page d'inscription via le formulaire en post avec
          //le router.post('/'...).
        var login = req.body.login,
            gender = req.body.gender,
            fname = req.body.fname,
            lname = req.body.lname,
            pswd = req.body.pswd,
            cpswd = req.body.cpswd,
            email = req.body.email,
            city = req.body.city,
            age = req.body.age,
            interest = req.body.interest
        
            //verifier que toutes les variables sont bien recuperees
            if (login && gender && fname && lname && pswd && cpswd && email && city && age && interest)
            {
                var queryString = "SELECT * FROM users WHERE login = ? OR email = ?"
                connect.query(queryString, [req.body.login, req.body.email],function(err, rows, fields) {
                    if (err) throw err;
                    console.log("Everythng's good");
                    res.json(rows);
                })
            }
            else
            {
                res.redirect('/');
                console.log('problem');
            }
      });
      // define the success route
      router.get('/success', function(req, res) {
        res.send('Registration successfull. You will receive an email with your activation link. See you soon !');
      });
module.exports = router