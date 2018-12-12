'use strict';

let source = document.getElementById('playerSource'),
    player = document.getElementById('player');
source.src = "../files/07. Georges Bizet - Carmen.mp3";
player.load();
player.controls = false;

function changeImage()
{
  let image =  document.getElementById("imageOne"),
  player = document.getElementById('player');

  if (image.getAttribute('src') === "images/Play_off.png")
  {
    image.src = "images/Play_on.png";
    player.muted = true;
  }
  else
  {
    if (player.paused) {player.play();}
    image.src = "images/Play_off.png";
    player.muted = false;
  }
}

document.getElementById('id01').addEventListener('submit', id01);

function id01(event){
  event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  fetch('http://localhost:8000/login', {
    method: 'POST',
    body: new URLSearchParams({username:username, password:password}),
    headers: new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  })

  .then((res) => res.json())
  .then(function(json){Login(json);})
  .catch(function(error){error_div(error);});
}

function Login(content) {
    let like = document.getElementById("like_content");
    if (like.style.display === "block") {
      like.style.display = "none";
    } else {
      like.style.display = "block";
    }

  let logged = document.getElementById("forma");
  if (logged.style.display === "none") {
    logged.style.display = "block";
  } else {
    logged.style.display = "none";
  }

  let log_btn = document.getElementById("login_btn");
  if (log_btn.style.display === "none") {
    log_btn.style.display = "block";
  } else {
    log_btn.style.display = "none";
  }

  let prof_btn = document.getElementById("profile_content");
  if (prof_btn.style.display === "block") {
    prof_btn.style.display = "none";
  } else {
    prof_btn.style.display = "block";
  }

  let logOut_btn = document.getElementById("logout_btn");
  if (logOut_btn.style.display === "block") {
    logOut_btn.style.display = "none";
  } else {
    logOut_btn.style.display = "block";
  }
}


function LogOut(){
  let like = document.getElementById("like_content");
  if (like.style.display === "none") {
    like.style.display = "block";
  } else {
    like.style.display = "none";
  }

  let log_btn = document.getElementById("login_btn");
  if (log_btn.style.display === "block") {
    log_btn.style.display = "none";
  } else {
    log_btn.style.display = "block";
  }

  let prof_btn = document.getElementById("profile_content");
  if (prof_btn.style.display === "none") {
    prof_btn.style.display = "block";
  } else {
    prof_btn.style.display = "none";
  }

  let logOut_btn = document.getElementById("logout_btn");
  if (logOut_btn.style.display === "none") {
    logOut_btn.style.display = "block";
  } else {
    logOut_btn.style.display = "none";
  }

}

function error_div(){
  let error = document.getElementById("error");
  if (error.style.display === "block") {
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
}


