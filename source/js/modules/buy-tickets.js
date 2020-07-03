'use strict';

(function () {
  var popup = document.querySelector('.popup--tickets');
  var overlay = document.querySelector('.overlay');
  var table = document.querySelector('.tickets-table');

  if (!popup || !overlay || !table) {
    return;
  }

  var form = popup.querySelector('.form');
  var btnClose = popup.querySelector('.popup__close');
  var btnSubmit = form.querySelector('.form__btn-submit');
  var btnThanks = popup.querySelector('.popup__thanks-btn');
  var inputName = form.querySelector('#tickets-name');
  var inputMail = form.querySelector('#tickets-mail');
  var areaName = form.querySelector('.form__area--name');
  var areaEmail = form.querySelector('.form__area--mail');
  var body = document.querySelector('body');

  var onInput = function (evt) {
    var activeInput = evt.target;
    var area = activeInput.closest('.form__area');
    area.classList.toggle('form__area--error', false);
    activeInput.removeEventListener('input', onInput);
  };

  var onClickBtnSubmit = function (evt) {
    if (!inputName.value || !inputMail.value) {
      evt.preventDefault();
      if (!inputName.value) {
        areaName.classList.add('form__area--error');
        inputName.addEventListener('input', onInput);
      }
      if (!inputMail.value) {
        areaEmail.classList.add('form__area--error');
        inputMail.addEventListener('input', onInput);
      }
    } else {
      evt.preventDefault();
      popup.classList.add('popup--submit');
      btnSubmit.removeEventListener('click', onClickBtnSubmit);
    }
  };

  var onClosePopup = function (evt) {
    evt.preventDefault();
    popup.classList.remove('popup--open');
    popup.classList.remove('popup--submit', false);
    overlay.classList.remove('overlay--open');
    table.addEventListener('click', onClickBtnTable);
    btnSubmit.removeEventListener('click', onClickBtnSubmit);
    overlay.removeEventListener('click', onClosePopup);
    window.removeEventListener('keydown', onKeydown);
    btnThanks.removeEventListener('click', onClosePopup);
    body.classList.remove('modal-no-scroll');
  };

  var onKeydown = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      onClosePopup(evt);
    }
  };

  var onClickBtnTable = function (evt) {
    evt.preventDefault();
    var activeElement = evt.target;

    if (activeElement.classList.contains('button-buy')) {
      overlay.classList.add('overlay--open');
      popup.classList.add('popup--open');

      var statusButton = activeElement.dataset.status;
      var relevantRadio = form.querySelector('input[value=' + statusButton + ']');
      relevantRadio.checked = true;

      inputName.focus();

      table.removeEventListener('click', onClickBtnTable);
      btnClose.addEventListener('click', onClosePopup);
      btnThanks.addEventListener('click', onClosePopup);
      btnSubmit.addEventListener('click', onClickBtnSubmit);
      overlay.addEventListener('click', onClosePopup);
      window.addEventListener('keydown', onKeydown);
      body.classList.add('modal-no-scroll');
    }
  };

  table.addEventListener('click', onClickBtnTable);
})();
