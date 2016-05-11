exports.checkToken = function tokenCheck (req, res, next) {
    var token   = req.headers.token;
    var loginId = req.headers.loginid;

    var queryString = 'select * from usertokendtls where LOGINID = ? and STATUS =? and TOKEN=?';
    Usertokendtls.query(queryString, [loginId, 'A', token], function (err, rows, fields) {
        if (err) {
            sails.log.error(err);
            return res.json({statusCode: '500', statusMsg: 'TECHNICAL ERROR'});
        }
        console.log(rows.length)
        if (rows.length <= 0) return res.json({statusCode: '500', statusMsg: 'TOKEN MISSMATCH'});
        next();
    });
};
