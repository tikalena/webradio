// Get the modal
var modal = document.getElementById('forma');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());

var port = 63342;

var users = [
  {username: 'admin', password: '12345'}
];

var sessionHandler = require('./js/session_handler');
var store = sessionHandler.createStore();

app.use(cookieParser());

app.use(session({
  store: store,
  resave: false,
  saveUninitialized: true,
  secret: 'supersecret'
    }));

app.get('/', function (req, res){
  res.sendFile(path.join(_dirname, 'index.html'));
});

app.post('/login', function(req,res) {
  var foundUser;
  for (var i=0; i<users.lenght; i++){
    var u =users[i];
      if(u.users == req.body.username && u.password == req.body.password){
        foundUser =u.username;
        break;
      }
  }
  if (foundUser!== underfined){
    req.session.username = foundUser;
    console.log("Login succeeded: ", req.session.username);
    res.send('Login succesful: ' + ' sessionID: ' + req.session.id + '; user: ' + req.session.username );
  }
  else{
    console.log('Login failed: ', req.body.username)
    res.status(401).send('Login error');
  }
});

app.get('/check', function (req, res){
  if (req.session.username){
    res.set('Content-type', 'text/html');
    res.send('<h2>User' + req.session.username + 'is logged in! </h2>')
  } else {
    res.send('not logged in');
  }
});

app.listen(port, function(){
  console.log('app running on port' + port);
});

