'use strict';
require('dotenv').config();
const
    db          = require('./modules/db'),
    connection  = db.connect(),

    express     = require('express'),
    app         = express(),
    port        = process.env.PORT || 8000, //either PORT from .env or 8000

    multer      = require('multer'),
    upload      = multer({dest: 'pub/files/'}),

    id3         = require('node-id3'),
    mp3dur      = require('get-mp3-duration'),
    fs          = require('fs')
;

app.set('view engine', 'ejs');
app.use(express.static('pub'));


// render /test
app.get('/test', (req,res) => {
  connection.query('select * from Song', (err,result) =>{
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
    const
        uploadFile    = file.destination+file.filename,
        originalFile  = file.destination+file.originalname,
        fileName      = file.originalname,
        tags          = id3.read(uploadFile),
        buffer        = fs.readFileSync(uploadFile),
        duration      = mp3dur(buffer),
        data          = {
                          title: tags.title,
                          artist: tags.artist,
                          dur: duration,
                          file: fileName
                        };

    //rename files upon upload
    fs.rename (uploadFile, originalFile, (err) =>{
      if (err) throw err;
    });

    db.insert (data, connection, () => {
      next();
    });
  });
});

app.use('/upload', (req, res) => {
  res.send('All done');
});

//rendering /api/:id-path
app.get ('/api/', (req,res) => {
  res.json({'Error':'1'});
});

app.get ('/api/:path', (req,res) => {
  db.apiCall(connection, {id:'', what: req.params.path}, returnData =>{
    res.json(returnData);
  });
});

app.get ('/api/:path/:id', (req,res) => {
  db.apiCall(connection, {id:req.params.id, what: req.params.path}, returnData =>{
    res.json(returnData);
  });
});

//something went wrong, inform about that with 404
app.use(function(req, res) {
  res.status(404).send("<strong>"+req.originalUrl + '</strong> not found');
});

//listen to port "PORT" or 8000
app.listen(port, () => {
  console.log("Listening to http://localhost:"+port);
});