'use strict';

(function () {
  var body = document.querySelector('body');

  if (!body) {
    return;
  }

  body.classList.toggle('nojs', false);
})();
