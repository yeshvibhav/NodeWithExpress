
exports.adminLogout = function (req,res) {

    var db        = require('../config/db');
    var trycatch  = require('trycatch');
    var userName  = req.body.userName;


    trycatch(function () {

        var query = "Update merchantuser set STATUS=?" +
            " Where LOGINID=?";

        db.query(query, ['I','admin'], function (err, rows) {
            if (err) {
                res.render('technicalError');
            }
            if (rows != undefined) {
                var message="";
                var ErrMessage="";
                ErrMessage.message ="";
                res.render('index', {ErrorMessage: ''});
            }
        });


    }, function (err) {
        res.render('technicalError');
    });

};