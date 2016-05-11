var mysql   = require('promise-mysql');

var pool = mysql.createPool({
    host: '192.168.1.67',
    user: 'nodeexpress',
    password: 'nodeexpress',
    database: 'nodeexpress'
});
module.exports = pool;