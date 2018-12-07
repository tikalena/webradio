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

app.set('view engine', 'ejs');
app.use(express.static('pub'));

//DB connect
const connection = db.connect();

// render /test
app.get('/test', (req,res) => {
  connection.query('select * from Song', (err,result) =>{
    console.log(result);
    res.render('pages/index', {
      siteTitle: 'Hello world',
      pageTitle: 'Testing',
      items: result
    });
  });
});

// render /upload
app.post('/upload', upload.array('mp3'), (req, res, next) => {
  req.files.forEach((file) =>{
    const uploadFile    = file.destination+file.filename,
          originalFile  = file.destination+file.originalname,
          fileName      = file.originalname;
    //reading id3-tags
    const tags=id3.read(uploadFile);

    //reading mp3-file duration
    const buffer = fs.readFileSync(uploadFile);
    tags.duration = mp3dur(buffer);

    //rename files upon upload
    fs.rename(uploadFile, originalFile, (err) =>{
      if (err) throw err;
    });

    const data = {
      title: tags.title,
      artist: tags.artist,
      dur: tags.duration,
      file: fileName
    };
    db.insert(data, connection, () => {
      next();
    });
  });
});

app.use('/upload', (req, res) => {
  res.send('All done');
});

//listen to port 8000
app.listen(8000, () => {
  console.log("Listening to http://localhost:8000");
});