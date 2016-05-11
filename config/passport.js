/**
 * Created by sanketp on 11/16/2015.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql         = require('mysql');
var merchantUsers = require('../models/Users');


var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    passwordString = 'd6F3Efeqqweqe';

passport.use(new LocalStrategy(
    function(username, password, done) {


        var cipher = crypto.createCipher(algorithm,passwordString)
        var hasedValue = cipher.update(password,'utf8','hex')
        hasedValue += cipher.final('hex');

        //username ='admin';
        var db = require('../config/db');

        var selectQuery="Select * from merchantuser where LOGINID=? and STATUS=?";
        db.query(selectQuery, [username,'I'], function (err, rows, fields) {

            if (err) {

                return done(err);
            }
            if (rows !=undefined && rows.length > 0) {


                if(rows[0].PASSWORD==hasedValue) {
                    var updateQuery = "Update merchantuser set STATUS=?" +
                        " Where LOGINID=?";

                    db.query(updateQuery, ['A', username], function (err, rows) {
                        if (err) {

                            return done(err);
                        }
                        if (rows != undefined) {

                            return done(null, true, {message: 'Valid User'});
                        }
                    });
                }
                else{

                    return done(err);
                }
            }
            else{

                return done(null, false, { message: 'Not a Valid User' });
            }
        });


    }
));