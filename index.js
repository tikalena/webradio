'use strict';
require('dotenv').config();
const
    db            = require('./modules/db'),
    connection    = db.connect(),

    express       = require('express'),
    app           = express(),
    port          = process.env.PORT || 8000, //either PORT from .env or 8000

    multer        = require('multer'),
    upload        = multer({dest: 'pub/files/'}),

    id3           = require('node-id3'),
    mp3dur        = require('get-mp3-duration'),
    fs            = require('fs'),
    passport      = require('passport'),
    session       = require('express-session'),
    bodyParser    = require('body-parser'),
    bcrypt        = require('bcrypt'),
    cookie        = require('cookie-parser'),
    LocalStrategy = require('passport-local').Strategy
;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cookie());

app.use(session({
  secret: 'WebRadioSession',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true}
}));

passport.serializeUser((user,done) => {
  console.log('serialize: ');
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserialized: '+user);
  done(null, user);
});

/* Just tot save this code
{
  //fields in HTML form
  usernameField: 'username',
      passwordField: 'password'
},*/

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username);
  console.log(password);
  const doLogin = (username, password) => {
        return new Promise((resolve, reject) => {
          db.login([username], connection, (result) => {
            /* Use this to check encrypted password*/
            bcrypt.compare(password, result[0].Password, (err, res) => {
              res ? resolve(result) : reject(err)
            });
          });
        });
      };

      return doLogin(username, password)
      .then((result) => {
        if (result.length < 1) {
          return done(null, false);
        } else {
          delete  result[0].Password; // remove password from user's data
          return done(null, result[0]); // result[0] is user's data, accessible as req.user
        }
      }).catch(error => {
        return done(null, error);
      });
    },
));

app.use(passport.initialize());
app.use(passport.session());

//app.set('view engine', 'ejs');
app.use(express.static('pub'));

// render /login
app.post('/login', (req, res, next) =>{
  passport.authenticate('local', (err, user) =>{
    if (err) {
      return next(err);
    }
    if (!user) { // if login not happening
      return res.json({
        "code":204,
        "success":"something is wrong. Codeline 101 in index.js"
      });
    }
    req.logIn(user, function(err) {
      // send userID as cookie:
      res.cookie('userID', req.user.UID);
      if (err) {
        return next(err);
      }
      return res.json({
        "code":200,
        "success":"login sucessfull"
      }); // if login successful
    });
  })(req, res, next);
});

app.get('/logout', (req, res) =>{
  req.logout();
  let dod = req.session.destroy(err =>{
    console.log(dod);
  });
  res.sendStatus(401);
  /*res.json({
    "code":200,
    "success":"logged out"
  });*/
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