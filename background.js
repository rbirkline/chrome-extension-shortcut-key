'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({sound: 'relentless.mp3'}, function() {
  });
});

chrome.commands.onCommand.addListener(function(cmd){
  console.log(cmd);
  if (cmd == 'trigger_sound'){
    chrome.storage.sync.get(['sound'], function(result) {
      var myAudio = new Audio(chrome.runtime.getURL("sounds/"+result.sound));
      myAudio.play();
    });
  }
});
