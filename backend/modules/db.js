'use strict';
const mysql = require('mysql2');
const connect = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
};

const insertNewFile = (data, connection, callback) => {
  connection.execute('SELECT AID FROM Artist WHERE Name LIKE ? LIMIT 1',[data.artist],(err,results) =>{
    if (results.length) { //if artist exist in database
      data.id=results[0].AID;
      insertToSong(data, connection, callback);
    }
    else { //if artist does not exist in database
      connection.execute('insert into Artist set Name=?',[data.artist],(err,result) => {
        data.id=result.insertId;
        insertToSong(data, connection, callback);
        callback(result);
      });
    }
    callback(results);
  });
};

const insertToSong = (data,connection, call) => {
  connection.execute('SELECT SID FROM Song WHERE Name = ? AND AID = ?',[data.title,data.id], (err, result) =>{
    if (!result.length) {
      connection.execute('insert into Song (Name, Duration, Filename, CID, AID) values (?,?,?,?,?)',[data.title,data.dur,data.file,2,data.id],(err, resu) => {});
      console.log ('Song not in database, adding');
    }
    else {
      console.log ('File already in DB');
    }
    call(result);
  });
};

module.exports = {
  connect: connect,
  insert: insertNewFile,
};