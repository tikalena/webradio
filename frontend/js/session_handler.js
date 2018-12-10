var cookieParser = require('cookie-parser');
var session = require('express-session');

var MSSQLSTORE = require('connect-mysql')(session);
var mssql = require('mssql');

module.exports = {
  create: function() {
    var config = {
      user: 'test',
      password: '12345',
      server: 'localhost',
      database: 'tsd',
      port: 3306,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 3000
      }
    }
    return new MSSQL(config);
  }
}