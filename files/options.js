sounds = [
  "chin-up.mp3",
  "definite.mp3",
  "graceful.mp3",
  "hide-and-seek.mp3",
  "quite-impressed.mp3",
  "relentless.mp3",
  "stairs.mp3",
  "to-the-point.mp3",
  "unconvinced.mp3"
];

current = '';
chrome.storage.sync.get(['sound'], function(result) {
  current = result.sound;
  document.querySelector('#s_new_sound').innerText = current;
  document.querySelector('#new_sound').value = current;
  document.querySelector('#current_sound').innerText = current;

  the_list = document.querySelector('#sound_list');
  the_list.innerHTML = '';
  for (let i in sounds){
    let v = document.createElement('li');
    if (sounds[i] == current){
      v.setAttribute('class','selected');
    }
    v.innerHTML = sounds[i];
    v.setAttribute('data-id',i);
    v.onclick = function(){setPlayer(this)};
    the_list.appendChild(v);
  }

});



function setPlayer(x){
  console.log('play sound');
  for (let i of document.querySelectorAll('#sound_list li')){
    i.className = '';
  }
  x.className = 'selected';
  let a = document.querySelector('#play_sound');
  a.setAttribute('src','../sounds/'+sounds[x.getAttribute('data-id')]);
  a.play();

  document.querySelector('#s_new_sound').innerText = x.innerText;
  document.querySelector('#new_sound').value = x.innerText;

}

function saveDefault(x){
  chrome.storage.sync.set({sound: x}, function() {
  });
  window.history.go(0);
}
document.querySelector('#save_button').onclick = function(){saveDefault(document.querySelector('#new_sound').value)};
