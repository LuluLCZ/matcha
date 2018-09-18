var express = require('express'),
    connect = require('../config/database.js'),
    session = require('express-session'),
    regex = require('regex-email'),
    iplocation = require('iplocation'),
    ageCalc = require('age-calculator'),
    parse = require('parse').parse,
    bcrypt = require('bcrypt'),
    router = express.Router()

var {AgeFromDateString, AgeFromDate} = require('age-calculator')
    const saltRound = 10

    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
      });

      router.post('/', function(req, res) {
          //Recuprer toutes les variables de la page d'inscription via le formulaire en post avec
          //le router.post('/'...).
        var login = req.body.login.toLowerCase(),
            gender = req.body.gender,
            fname = req.body.fname.toLowerCase(),
            lname = req.body.lname.toLowerCase(),
            pswd = req.body.pswd,
            cpswd = req.body.cpswd,
            email = req.body.email,
            city = req.body.city,
            age = new AgeFromDateString(req.body.age).age,
            interest = req.body.interest
            passwdhash =  bcrypt.hashSync(pswd, saltRound)
            //verifier que toutes les variables sont bien recuperees
            if (login && gender && fname && lname && pswd && cpswd && email && city && age && interest)
            {
                var queryString = "SELECT * FROM users WHERE login = ? OR email = ?"
                connect.query(queryString, [req.body.login, req.body.email],function(err, rows, fields) {
                    if (err) throw err;
                    console.log("Everythng's good");
                    if (!rows[0])
                    {
                        connect.query("INSERT INTO users SET login = ?, gender = ?, fname = ?, lname = ?, pswd = ?, email = ?, city = ?, age = ?, interest = ?", [login, gender, fname, lname, passwdhash, email, city, age, interest], function(err, result) {
                            if (err) throw err;
                            res.redirect("/login");
                        })
                    }
                    else
                    {
                        res.redirect("/");
                    }
                })
            }
            else
            {
                res.redirect('/');
                console.log('problem, all the variables haven\'t been registered successfully');
            }
      });
      // define the success route
      router.get('/success', function(req, res) {
        res.send('Registration successfull. You will receive an email with your activation link. See you soon !');
      });
module.exports = router