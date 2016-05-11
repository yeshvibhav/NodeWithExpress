/**
 * Created by yashwant on 7/5/16.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: '192.168.1.67',
    user: 'nodeexpress',
    password: 'nodeexpress',
    database: 'nodeexpress'
});

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...');
})

module.exports = connection;