'use strict';

(function () {
  var DESKTOP = 1023;
  var contacts = document.querySelector('.contacts');

  if (!contacts) {
    return;
  }

  var feedback = contacts.querySelector('.feedback__wrapper');
  var overlay = feedback.querySelector('.feedback__overlay');
  var form = feedback.querySelector('.form');
  var btnClose = feedback.querySelector('.feedback__close');
  var btnCloseThansk = feedback.querySelector('.feedback__close--thanks');
  var btnSubmit = form.querySelector('.form__btn-small');
  var btnThanks = feedback.querySelector('.feedback__thanks-btn');
  var inputName = form.querySelector('#feedback-name');
  var inputMail = form.querySelector('#feedback-mail');
  var textarea = form.querySelector('#feedback-message');
  var areaName = form.querySelector('.form__area--name');
  var areaEmail = form.querySelector('.form__area--mail');
  var areaTextarea = form.querySelector('.form__area--textarea');
  var btnOpenPopup = contacts.querySelector('.feedback__btn-open');
  var body = document.querySelector('body');
  var widthWindow = document.documentElement.clientWidth;

  var onResize = function () {
    widthWindow = document.documentElement.clientWidth;
    if (widthWindow < DESKTOP && overlay.classList.contains('feedback__overlay--open')) {
      onClosePopup();
    }
  };

  var onInput = function (evt) {
    var activeInput = evt.target;
    var area = activeInput.closest('.form__area');
    area.classList.toggle('form__area--error', false);
    activeInput.removeEventListener('input', onInput);
  };

  var onClickBtnSubmit = function (evt) {
    if (!inputName.value || !inputMail.value || !textarea.value) {
      evt.preventDefault();
      if (!inputName.value) {
        areaName.classList.add('form__area--error');
        inputName.addEventListener('input', onInput);
      }
      if (!inputMail.value) {
        areaEmail.classList.add('form__area--error');
        inputMail.addEventListener('input', onInput);
      }
      if (!textarea.value) {
        areaTextarea.classList.add('form__area--error');
        textarea.addEventListener('input', onInput);
      }
    } else {
      evt.preventDefault();
      feedback.classList.add('feedback__wrapper--submit');
      overlay.classList.add('feedback__overlay--open');
      overlay.addEventListener('click', onClosePopup);
      window.addEventListener('keydown', onKeydown);
      btnThanks.addEventListener('click', onClosePopup);
      btnClose.addEventListener('click', onClosePopup);
      btnCloseThansk.addEventListener('click', onClosePopup);
      inputName.value = '';
      inputMail.value = '';
      textarea.value = '';
      body.classList.add('modal-no-scroll');
    }
  };

  var onClosePopup = function () {
    feedback.classList.remove('feedback__wrapper--open');
    feedback.classList.add('feedback__wrapper--close');
    setTimeout(function () {
      feedback.classList.remove('feedback__wrapper--close');
    }, 300);
    overlay.classList.remove('feedback__overlay--open');
    feedback.classList.remove('feedback__wrapper--submit', false);
    window.removeEventListener('keydown', onKeydown);
    btnThanks.removeEventListener('click', onClosePopup);
    btnClose.removeEventListener('click', onClosePopup);
    btnCloseThansk.removeEventListener('click', onClosePopup);
    body.classList.remove('modal-no-scroll');
  };

  var onKeydown = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      onClosePopup(evt);
    }
  };

  var onClickBtnOpen = function (evt) {
    evt.preventDefault();
    overlay.classList.add('overlay-feedback--open');
    inputName.focus();
    feedback.classList.add('feedback__wrapper--open');
    overlay.addEventListener('click', onClosePopup);
    window.addEventListener('keydown', onKeydown);
    btnSubmit.addEventListener('click', onClickBtnSubmit);
    btnClose.addEventListener('click', onClosePopup);
    body.classList.add('modal-no-scroll');
  };

  btnOpenPopup.addEventListener('click', onClickBtnOpen);
  btnSubmit.addEventListener('click', onClickBtnSubmit);
  window.addEventListener('scroll', onResize);
})();
