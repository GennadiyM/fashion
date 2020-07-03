'use strict';

(function () {
  var langSelect = document.querySelector('.lang-selection');

  if (!langSelect) {
    return;
  }

  var langOpen = langSelect.querySelector('.lang-selection__title');
  var inputs = langSelect.querySelectorAll('input');

  var addListener = function (element) {
    element.addEventListener('change', function () {
      langOpen.innerHTML = element.value;
      langSelect.classList.remove('lang-selection--open');
    });
  };

  var onClickLangOpen = function (evt) {
    evt.preventDefault();
    langSelect.classList.toggle('lang-selection--open');
    for (var i = 0; i < inputs.length; i++) {
      addListener(inputs[i]);
    }
  };

  langOpen.addEventListener('click', onClickLangOpen);
})();
