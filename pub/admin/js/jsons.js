'use strict';

fetch('http://localhost:8000/api/cat')
.then(response => response.json())
.then(data => {showCats(data)})
.catch(error => console.error(error));


const showCats = (data) => { //show category buttons in interface
  let buttons = document.getElementById('catButton');
  for (let i=0;i<data.length;i++) {
    let button = document.createElement('button');
    button.innerText = data[i].Name;
    button.setAttribute("onclick","showFileList("+data[i].CID+")");
    buttons.appendChild(button);
  }

};

const showFileList = (id) => { //show songs in category
  let ul = document.getElementById('music');
  ul.innerHTML="";
  fetch('http://localhost:8000/api/songs/'+id)
  .then(response => response.json())
  .then(data => {
    for (let i=0;i<data.length;i++) {
      let li = document.createElement('li'),
          a = document.createElement('a'),
          audio = document.createElement('audio'),
          source = document.createElement('source');
      source.src = '../files/'+data[i].Filename;
      source.type = 'audio/mpeg';

      audio.controls = true;
      audio.appendChild(source);

      a.innerText = data[i].Artist + " - " + data[i].Title;
      //a.href="#win"+i;
      li.setAttribute("onclick","showModalFile("+data[i].SID+")");
      li.appendChild(a);
      li.appendChild(audio);

      ul.appendChild(li);
    }
  })
  .catch(error => console.error(error));
};

const showModalFile = (id) => { //show single file data
  let modal = document.getElementById('fileInfo'),
      span = document.getElementById('close'),
  content = document.getElementById('inContent');
  content.innerHTML = "Hello world<br/> Hello world";
  modal.style.display = "block";
  span.onclick = () => {modal.style.display = "none";};
  window.onclick = (event) => {if (event.target === modal) {modal.style.display = "none";}}

};