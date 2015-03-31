var socket;
$(function() {
  "use strict";

  socket = io();

  function getRandomBranchName() {
    var branchNames = [
    'master',
    'not_develop',
    'MakePickles',
    'WandsAreForecasting',
    'BirthOfReptar',
    'DataDumperWoo',
    'BabyRepdroid',
    'BrightNewBottomlessVoid',
    'CanHasStucturePlz',
    'RealBranchNameISwear',
    'BananaTime'
    ];

    return branchNames[Math.floor(Math.random() * branchNames.length)];
  }

  function getRandomSweetAlert() {
    var alerts = [
      {
        title: 'Build succeeded!',
        text: 'Branch: {rand_branch}',
        type: 'success'
      }, {
        title: '{rand_number} Tests Passed',
        text: 'Branch: {rand_branch}',
        type: 'success'
      }, {
        title: 'BANANA TIME!',
        imageUrl: 'bananatime.gif',
        imageSize: '400x225'
      }, {
        title: 'Unknown error encountered.',
        text: 'INTERNAL ERROR: {rand_number}',
        type: 'error'
      }, {
        title: '{rand_number} hours since last workplace accident',
        text: 'Don\'t fuck it up!',
        type: 'info'
      }, {
        title: 'Job queue stalled',
        text: '{rand_number} jobs queued',
        type: 'warning'
      }, {
        title: 'Fire needs more logs!',
        type: 'warning'
      }, {
        title: 'Culture approaching maximum levels',
        text: 'You literally couldn\'t get much more awesome',
        type: 'success'
      }, {
        title: 'Let\'s talk about backlogs',
        imageUrl: 'backlogs.gif',
        imageSize: '400x300'
      }, {
        title: 'Give me compliments',
        imageUrl: 'compliments.gif',
        imageSize: '400x280'
      }, {
        title: 'Build Succeeded!',
        imageUrl: 'horse.gif',
        imageSize: '400x225'
      }
    ];

    var sweet = alerts[Math.floor(Math.random()*alerts.length)];
    sweet.timer = sweet.timer || 30000;
    sweet.allowOutsideClick = true;

    if (sweet.title) {
      sweet.title = sweet.title
      .replace('{rand_branch}', getRandomBranchName())
      .replace('{rand_number}', getRandomBetween(10, 9000));
    }

    if (sweet.text) {
      sweet.text = sweet.text
      .replace('{rand_branch}', getRandomBranchName())
      .replace('{rand_number}', getRandomBetween(10, 9000));
    }

    return sweet;
  }

  function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function displayRandomStatus() {
    sweetAlert(getRandomSweetAlert());
    setTimeout(displayRandomStatus, getRandomBetween(3 * 60 * 1000, 5 * 60 * 1000));
  }

  sweetAlertInitialize();
  displayRandomStatus();

  socket.on('alert', function(msg){
    sweetAlert({
      title: msg.title,
      text: msg.text,
      type: msg.type,
      timer: 10000,
      allowOutsideClick: true
    });
  });

  socket.on('gif', function(msg){
    sweetAlert({
      title: msg.text,
      imageUrl: msg.img,
      imageSize: msg.size,
      timer: 10000,
      allowOutsideClick: true
    });
  });

  socket.on('bomb', function(){
    document.getElementById('audiobomb').play();
  });

});
