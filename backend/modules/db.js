'use strict';
// get the client
const mysql = require('mysql2');

const connect = () => {

/* create the connection to database*/
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM Song;',
      (err, results, fields) => {
        callback(results);
      },
  );
};

const insert = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO wp_users (ufname, ulname, ufile, uthumb) VALUES (?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

module.exports = {
  connect: connect,
  select: select,
  insert: insert,
};