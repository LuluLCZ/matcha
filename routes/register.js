var express = require('express'),
    connect = require('../config/database.js'),
    session = require('express-session'),
    regex = require('regex-email'),
    iplocation = require('iplocation'),
    ageCalc = require('age-calculator'),
    parse = require('parse').parse,
    bcrypt = require('bcrypt'),
    nodemailer = require('nodemailer'),
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
                if (login.length <= 20 && fname.length <= 25 && lname.length <= 25 && pswd.length <= 25 && email.length <= 35 && city.length <= 35)
                {
                    var queryString = "SELECT * FROM users WHERE login = ? OR email = ?"
                    connect.query(queryString, [req.body.login, req.body.email],function(err, rows, fields) {
                        if (err) throw err;
                        console.log("Everythng's good");
                        if (!rows[0])
                        {
                            tohash = "alaiseblaise"+Math.floor(Math.random() * Math.floor(555))
                            var hashh = bcrypt.hashSync(tohash, saltRound);
                            var hash = "";
                            hash = hashh.replace(/\//g , hash);
                            
                            connect.query("INSERT INTO users SET login = ?, gender = ?, fname = ?, lname = ?, pswd = ?, email = ?, city = ?, age = ?, interest = ?, hash = ?", [login, gender, fname, lname, passwdhash, email, city, age, interest, hash], function(err, result) {
                                if (err) throw err;
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                    user: 'matchabylacaze@gmail.com',
                                    pass: 'Poutrelle123'
                                    }
                                });
                                
                                var mailOptions = {
                                    from: 'matchabylacaze@gmail.com',
                                    to: email,
                                    subject: 'Welcome to Matcha !',
                                    text: 'Your confirmation link is : '+'http://localhost:3306/confirm/'+hash
                                };
                                
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                    console.log(error);
                                    } else {
                                    console.log('Email sent: ' + info.response);
                                    }
                                });
                                    iplocation(req.ip, function (error, res) {
                                        if (res.city)
                                        {
                                            connect.query("UPDATE users SET longitude = ?, latitude = ?, city = ? WHERE login = ?", [res.lon, res.lat, res.city, login], function(err) {
                                                if (err) throw err;
                                                req.session.info = "Vous avez recu un mail avec le lien de confirmation sur votre adresse mail."
                                            })
                                        }
                                        else
                                        {
                                            connect.query("UPDATE users SET longitude = ?, latitude = ?, city = ? WHERE login = ?", [2.3488, 48.85341, "Paris", login], function(err) {
                                                if (err) throw err;
                                                req.session.info = "Vous avez recu un mail avec le lien de confirmation sur votre adresse mail."
                                            })
                                        }
                                    })
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
                    req.session.error = "Your informations are too big, please reduce the lenght."
                    res.redirect('/home');
                }
            }
            else
            {
                res.redirect('/');
            }
      });
      // define the success route
      router.get('/success', function(req, res) {
        res.send('Registration successfull. You will receive an email with your activation link. See you soon !');
      });
module.exports = router