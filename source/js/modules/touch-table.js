'use strict';

(function () {
  var TABLET = 643;
  var table = document.querySelector('.tickets-table');

  if (!table) {
    return;
  }

  var widthWindow = document.documentElement.clientWidth;
  var tableWidth = table.offsetWidth;
  var maxDist = tableWidth - widthWindow;

  var startX = false;
  var dist = 0;
  var bias = 0;
  var startTable = table.getBoundingClientRect().left;

  var getResetParametrs = function () {
    widthWindow = document.documentElement.clientWidth;
    tableWidth = table.offsetWidth;
    maxDist = tableWidth - widthWindow;
    startX = false;
    dist = 0;
    bias = 0;
    startTable = table.getBoundingClientRect().left;
  };

  table.addEventListener('touchstart', function (e) {
    widthWindow = document.documentElement.clientWidth;
    tableWidth = table.offsetWidth;
    if (widthWindow > TABLET) {
      return;
    }
    if (!startX) {
      startX = e.changedTouches[0].clientX;
    }
  }, false);

  table.addEventListener('touchmove', function (e) {
    widthWindow = document.documentElement.clientWidth;
    if (widthWindow > TABLET) {
      return;
    }
    dist = e.changedTouches[0].clientX - startX;
    if (dist < 0) {
      maxDist = tableWidth + startTable - widthWindow;
      bias = Math.max(dist, -maxDist);
    } else {
      maxDist = -startTable;
      bias = Math.min(dist, maxDist);
    }
    table.style.left = startTable + bias + 'px';
  }, false);

  table.addEventListener('touchend', function () {
    widthWindow = document.documentElement.clientWidth;
    if (widthWindow > TABLET) {
      return;
    }
    getResetParametrs();
  }, false);

  window.addEventListener('resize', function () {
    getResetParametrs();
    if (widthWindow > TABLET) {
      return;
    }
    table.style.left = '';
  }, false);
})();
