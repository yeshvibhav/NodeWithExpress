/**
 * Created by yashwant on 7/5/16.
 */
var db               = require('../config/db');
var pool             = require('../config/dbPool');
var validatorService = require('../services/validatorService');
var Q = require('q');


exports.getMerchantList = function (req, res) {

            var trycatch   = require('trycatch');

            trycatch(function () {

                                var query = "SELECT mu.ID,mu.LOGINID,mu.FIRSTNAME,mu.LASTNAME,mu.GENDER,mu.MOBILECONTACTNUMBER,mu.NATIONALITY,mu.GENDER,DATE_FORMAT(mu.`CREATIONDATE`, '%Y-%m-%d %H:%i') AS 'CREATIONDATE' from merchantuser mu " +
                                    " WHERE mu.USERTYPE != ?";

                                db.query(query, ['SUPERADMIN'], function (err, rows) {
                                    if (err) {

                                        res.render('homePage', {AccessDeniedMessage: []});
                                    }

                                    if (rows != undefined && rows.length > 0) {

                                        res.render('approvedMerchants', {MerchantsParams: rows});

                                    }
                                    else {

                                        res.render('approvedMerchants', {MerchantsParams: rows});
                                    }
                                });


            }, function (err) {

                return res.json({statusCode: 500, statusMsg: "TECHNICAL_ERROR"});
            });


};

exports.addUsersList = function (req, res,done) {


    var trycatch    = require('trycatch');
    var userName    = req.body.userName;
    var gender      = req.body.gender;
    var firstName   = req.body.firstName;
    var lastName    = req.body.lastName;
    var nationality = req.body.nationality;
    var mobNo       = req.body.mobNo;
    var officeNum   = req.body.officeNum;


    trycatch(function () {

        var query = "SELECT * From merchantuser" +
            " WHERE LOGINID=? ";
        var registrationId ='100001';

        db.query(query, [userName], function (err, rows) {
            if (err) {

                res.render('homePage', {AccessDeniedMessage: []});

            }

            if (rows != undefined && rows.length == 0) {

                var query = "Insert Into merchantuser (`REGISTRATIONID`,`LOGINID`,`GENDER`,`FIRSTNAME`,`LASTNAME`,`NATIONALITY`,`MOBILECONTACTNUMBER`,`OFFICECONTACTNUMBER`)" +
                    " VALUES (?,?,?,?,?,?,?,?) ";

                db.query(query, [registrationId,userName,gender,firstName,lastName,nationality,mobNo,officeNum], function (err, rows) {
                    if (err) {
                        res.render('homePage', {AccessDeniedMessage: []});
                    }
                    if (rows != undefined) {
                      res.render('success');
                    }
                });
            }
            else {
                res.render('homePage', {MerchantsParams: rows});

            }
        });


    }, function (err) {

        res.render('homePage', {AccessDeniedMessage: []});
    });




};


exports.insertFetchUsersList = function (req, res,done) {


    var trycatch    = require('trycatch');
    var userName    = req.body.userName;
    var gender      = req.body.gender;
    var firstName   = req.body.firstName;
    var lastName    = req.body.lastName;
    var nationality = req.body.nationality;
    var mobNo       = req.body.mobNo;
    var officeNum   = req.body.officeNum;

    var validateInput         = {};
    validateInput.userName    = userName;
    validateInput.gender      = gender;
    validateInput.firstName   = firstName;
    validateInput.lastName    = lastName;
    validateInput.nationality = nationality;
    validateInput.mobileNo    = mobNo;
    validateInput.officeNo    = officeNum;

    trycatch(function () {

        validatorService.validate(res, validateInput, function (valid, validate) {
            if (valid) {

                var registrationId ='100001';

                var query = "SELECT * From merchantuser" +
                    " WHERE LOGINID=? ";

                db.query(query, [userName], function (err, rows) {
                    if (err) {
                        return res.json({statusCode: 500, statusMessage: 'Technical Error', err: err})
                    }

                    if (rows != undefined && rows.length == 0) {

                        var query = "Insert Into merchantuser (`REGISTRATIONID`,`LOGINID`,`GENDER`,`FIRSTNAME`,`LASTNAME`,`NATIONALITY`,`MOBILECONTACTNUMBER`,`OFFICECONTACTNUMBER`)" +
                            " VALUES (?,?,?,?,?,?,?,?) ";

                        db.query(query, [registrationId,userName, gender, firstName, lastName, nationality, mobNo, officeNum], function (err, rows) {
                            if (err) {
                                return res.json({statusCode: 500, statusMessage: 'User Details', err: err})
                            }
                            if (rows != undefined && rows.affectedRows > 0) {

                                var query = "SELECT * From merchantuser" +
                                    " WHERE LOGINID=? ";
                                db.query(query, [userName], function (err, userResult) {
                                    if (err) {
                                        return res.json({statusCode: 500, statusMessage: 'Technical Error', err: err})
                                    }

                                    if (userResult != undefined) {
                                        return res.json({
                                            statusCode: 200,
                                            statusMessage: 'User Details',
                                            userDetails: userResult
                                        })
                                    }
                                });
                            }

                        });
                    }
                    else {
                        return res.json({
                            statusCode: 500,
                            statusMessage: 'User Details',
                            userDetails: 'UserName Already Exist'
                        })

                    }
                });
            }
            else {
                return res.json({
                    statusCode: 500,
                    statusMessage: 'Validation Error',
                    validationError: validate
                })

            }
        });

    }, function (err) {

        return res.json({statusCode: 500, statusMessage: 'Technical Error', error:err})
    });
};


exports.delay = function (req, res,done) {

    var trycatch    = require('trycatch');

    trycatch(function () {


        function delay(interval) {
            return new Promise(function(resolve) {
                setTimeout(resolve, interval);
            });
        }

        delay(5000)
            .then(function() {
                res.json({statusCode:200, statusMessage:'Response After 5 Seconds'});
            }).catch(function (err){
                return res.json({statusCode: 500, statusMessage: err})
        });



    }, function (err) {

        return res.json({statusCode: 500, statusMessage: 'Technical Error', error:err})
    });
};


exports.withPromises = function (req, res,done) {


    pool.query("Select * From merchant").then(function(merchantResult){

        return pool.query("SELECT * From merchantuser Where LOGINID='admin' AND REGISTRATIONID=" +merchantResult[0].REGISTRATIONID+"");
    }).then(function(merchantUserResult){
        res.json({statusCode:200,merchantUserResult:merchantUserResult});
    }).catch(function(error){
        res.json({statusCode:500,statusResult:error});
    });


};


exports.insertFetchUsersListPromises = function (req, res,done) {


    var trycatch    = require('trycatch');
    var userName    = req.body.userName;
    var gender      = req.body.gender;
    var firstName   = req.body.firstName;
    var lastName    = req.body.lastName;
    var nationality = req.body.nationality;
    var mobNo       = req.body.mobNo;
    var officeNum   = req.body.officeNum;

    var validateInput         = {};
    validateInput.userName    = userName;
    validateInput.gender      = gender;
    validateInput.firstName   = firstName;
    validateInput.lastName    = lastName;
    validateInput.nationality = nationality;
    validateInput.mobileNo    = mobNo;
    validateInput.officeNo    = officeNum;

    trycatch(function () {

        validatorService.validate(res, validateInput, function (valid, validate) {
            if (valid) {

                var registrationId = '100001';

                var query = {
                    sql:"SELECT * From merchantuser" +
                    " WHERE LOGINID=?",
                    values: [userName]
                };

                pool.query(query).then(function (selectResult) {

                    if(selectResult.length ==0) {
                        var insertQuery = {
                            sql: "Insert Into merchantuser (`REGISTRATIONID`,`LOGINID`,`GENDER`,`FIRSTNAME`,`LASTNAME`,`NATIONALITY`,`MOBILECONTACTNUMBER`,`OFFICECONTACTNUMBER`)" +
                            " VALUES (?,?,?,?,?,?,?,?)",
                            values: [registrationId, userName, gender, firstName, lastName, nationality, mobNo, officeNum]
                        };

                        return pool.query(insertQuery).then(function (merchantUserResult) {
                            res.json({statusCode: 200, merchantUserResult: userName+ ' Created Successfully'});


                        }).catch (function (error) {
                            res.json({statusCode: 500, statusMessage: error});
                        });
                    }
                    else{
                        res.json({statusCode: 500, statusMessage: 'User Name Already Exist'});
                    }


                });
            }
            else {
                return res.json({
                    statusCode: 500,
                    statusMessage: 'Validation Error',
                    validationError: validate
                })

            }
        });

    }, function (err) {

        return res.json({statusCode: 500, statusMessage: 'Technical Error', error:err})
    });
};


exports.testPromises = function (req, res,done) {


    var Promise = require('bluebird');
 /*   var Promise1 = require('es6-promise');
    var Promise3 = require('es6-promise').Promise;*/



    var query1 = "SELECT * From merchantuser" +
        " WHERE LOGINID='admin'";


    Promise.promisify(db.query,db)(query1).then(function (rows){
      return rows;
    }).then(function (rows){
        res.json({statusCode:200,result:rows[0]});
    }).error(function (e){

        res.json({statusCode:500,error:e});
    }).catch(function (c){

        res.json({statusCode:401,error:c});
    });

};



