'use strict';

document.getElementById('id01').addEventListener('submit', id01);

function id01(event){
  event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  fetch('http://localhost:8000/login', {
    method: 'POST',
    headers : new Headers(),
    body:JSON.stringify({username:username, password:password})
  }).then((res) => res.json())
.then((data) =>  console.log(data))
.catch((err)=>console.log(err))
}