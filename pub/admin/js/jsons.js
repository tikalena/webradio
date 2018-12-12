'use strict';

fetch('http://localhost:8000/api/cat')
.then(response => response.json())
.then(data => {showCats(data)})
.catch(error => console.error(error));

/*async function fetchIt(url) {
  const fetchResult = fetch(url);
  const response = await fetchResult;
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}*/

const showCats = (data) => { //show category buttons in interface
  let buttons = document.getElementById('catButton');
  for (let i=0;i<data.length;i++) {
    let button = document.createElement('button'),
    li = document.createElement('li'),
    ul = document.createElement('ul');
    button.innerText = data[i].Name;
    button.setAttribute("onclick","showFileList("+data[i].CID+")");
    li.appendChild(button);
    ul.appendChild(li);
    buttons.appendChild(li);
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
      artistField = document.getElementById('artist'),
      titleField = document.getElementById('title'),
      songid = document.getElementById('songID'),
  jsonArtist =[];

  span.onclick = () => {modal.style.display = "none";};
  window.onclick = (event) => {if (event.target === modal) {modal.style.display = "none";}}
  content.innerHTML = "";

  fetch('http://localhost:8000/api/artist')
  .then(response => response.json())
  .then(data => {jsonArtist.push(data)})
  .catch(error => console.error(error));
  console.log(jsonArtist);

  fetch('http://localhost:8000/api/song/'+id)
  .then(response => response.json())
  .then(data => {

    artistField.value = data[0].Title;
    titleField.value = data[0].Artist;
    songid.value = data[0].SID;

  })
  .catch(error => console.error(error));

  modal.style.display = "block";
};
