$(function() {
  "use strict";

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
      }
    ];

    var sweet = alerts[Math.floor(Math.random()*alerts.length)];
    sweet.timer = sweet.timer || 20000;
    sweet.allowOutsideClick = true;

    sweet.title = sweet.title
      .replace('{rand_branch}', getRandomBranchName())
      .replace('{rand_number}', getRandomBetween(10, 9000));

    sweet.text = sweet.text
      .replace('{rand_branch}', getRandomBranchName())
      .replace('{rand_number}', getRandomBetween(10, 9000));

    return sweet;
  }

  function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function displayRandomStatus() {
    sweetAlert(getRandomSweetAlert());
    setTimeout(displayRandomStatus, getRandomBetween(4 * 60 * 1000, 8 * 60 * 1000));
  }

  sweetAlertInitialize();
  displayRandomStatus();
});
