'use strict';

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
  .then((json) =>  console.log(json))
  .catch((err) => console.log(err))
}