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
