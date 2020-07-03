'use strict';

(function () {
  var TABLET = 767;
  var DESKTOP = 1023;
  var body = document.querySelector('body');
  var header = document.querySelector('.main-header');
  var nav = document.querySelector('.main-nav');
  var btn = document.querySelector('.main-header__btn');
  var preview = document.querySelector('#preview');
  var widthWindow = document.documentElement.clientWidth;

  if (!header || !btn || !body) {
    return;
  }

  var bottomPositionPreview = preview.getBoundingClientRect().bottom;

  var getBottomPosition = function () {
    var position = btn.getBoundingClientRect().bottom;
    if (widthWindow > DESKTOP) {
      position = nav.getBoundingClientRect().bottom;
    }
    return position;
  };

  var bottomPosition = getBottomPosition();

  var onScroll = function () {
    bottomPositionPreview = preview.getBoundingClientRect().bottom;
    bottomPosition = getBottomPosition();

    if (widthWindow > TABLET) {
      if (bottomPosition > bottomPositionPreview) {
        header.classList.add('main-header--scroll');
      } else {
        header.classList.remove('main-header--scroll');
      }
    }
  };

  var onResize = function () {
    widthWindow = document.documentElement.clientWidth;
    getBottomPosition();
    if (widthWindow > DESKTOP) {
      body.classList.toggle('no-scroll', false);
    } else {
      if (header.classList.contains('main-header--opened')) {
        body.classList.toggle('no-scroll', true);
      }
    }
  };

  var onClickHeader = function (evt) {
    var activeElement = evt.target;
    if (activeElement.classList.contains('main-nav__link')) {
      header.classList.remove('main-header--opened');
      body.classList.remove('no-scroll');
      header.removeEventListener('click', onClickHeader);
    }
  };

  var onClickBtn = function (evt) {
    evt.preventDefault();
    header.classList.toggle('main-header--opened');
    if (header.classList.contains('main-header--opened')) {
      header.addEventListener('click', onClickHeader);
      body.classList.add('no-scroll');
    } else {
      header.removeEventListener('click', onClickHeader);
      body.classList.remove('no-scroll');
    }
  };

  btn.addEventListener('click', onClickBtn);
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);
})();
