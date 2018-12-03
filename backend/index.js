'use strict';

require('dotenv').config();
const db      = require('./modules/db');
const express = require('express');
const app     = express();
const fs      = require('fs');
const multer  = require('multer');
const upload  = multer({dest: 'pub/files/'});
const id3     = require('node-id3');
const mp3dur  = require('get-mp3-duration');


app.use(express.static('pub'));

//DB connect
const connection = db.connect();

db.select(connection, (results) => {
});

app.post('/upload', upload.single('mp3'), (req, res, next) => {
  //reading id3-tags
  const tags=id3.read(req.file.destination+req.file.filename);
  console.log(tags.title);
  console.log(tags.artist);

  //reading mp3-file duration
  const buffer = fs.readFileSync(req.file.destination+req.file.filename);
  const duration = mp3dur(buffer);
  console.log(duration);

  //rename files upon upload
  fs.rename(req.file.destination+req.file.filename, req.file.destination+req.file.originalname, (err) =>{
      if (err) throw err;
  });

  //console.log(req.file);
  next();
});

//listen to port 8000
console.log("Listeting to http://localhost:8000");
app.listen(8000);