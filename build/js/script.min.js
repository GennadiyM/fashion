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

'use strict';

(function () {
  var body = document.querySelector('body');

  if (!body) {
    return;
  }

  body.classList.toggle('nojs', false);
})();

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

'use strict';

(function () {
  var sections = document.querySelectorAll('[data-block]');

  if (!sections) {
    return;
  }

  var halfHeightWindow = window.innerHeight / 2;

  var getPosition = function (blocks) {
    var position = [];
    for (var i = 0; i < blocks.length; i++) {
      position[i] = {
        name: blocks[i].dataset.block,
        position: blocks[i].getBoundingClientRect().top,
      };
    }
    return position;
  };

  var checkPosition = function (blocks) {
    var block = false;
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].position >= 0 && blocks[i].position <= halfHeightWindow) {
        block = blocks[i].name;
      }
    }
    return block;
  };

  var sectionPositon = getPosition(sections);
  var activeBlock = checkPosition(sectionPositon);

  var onScroll = function () {
    sectionPositon = getPosition(sections);
    if (activeBlock !== checkPosition(sectionPositon) && checkPosition(sectionPositon)) {
      activeBlock = checkPosition(sectionPositon);
      var oldActiveLink = document.querySelector('.main-nav__link--active');
      var newActiveLink = document.querySelector('[href="#' + activeBlock + '"]');
      oldActiveLink.classList.remove('main-nav__link--active');
      newActiveLink.classList.add('main-nav__link--active');
    }
  };

  window.addEventListener('scroll', onScroll);
})();

/* eslint-disable */
'use strict';

(function () {
  var participants = document.querySelector('#participants');
  var participantsSlider = participants.querySelector('.swiper-container');

  if (!participantsSlider) {
    return;
  }

  var participantsSwiper = new Swiper(participantsSlider, {
    slidesPerView: 'auto',
    spaceBetween: 48,
    loopedSlides: 6,
    loop: true,
    loopFillGroupWithBlank: true,
    updateOnWindowResize: true,
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    navigation: {
      nextEl: '.slider--models .slider-toggle--right',
      prevEl: '.slider--models .slider-toggle--left',
    },
    pagination: {
      el: '.slider--models .slider__pagination',
      clickable: true,
    },
    breakpoints: {
      767: {
        slidesPerView: 1,
        spaceBetween: 48,
      }
    },
  });
})();

(function () {
  var jury = document.querySelector('#jury');
  var jurySlider = jury.querySelector('.swiper-container');

  if (!jurySlider) {
    return;
  }

  var jurySwiper = new Swiper(jurySlider, {
    slidesPerView: 'auto',
    spaceBetween: 35,
    loopedSlides: 6,
    loop: true,
    loopFillGroupWithBlank: true,
    updateOnWindowResize: true,
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
    navigation: {
      nextEl: '.slider--jury .slider-toggle--right',
      prevEl: '.slider--jury .slider-toggle--left',
    },
    pagination: {
      el: '.slider--jury .slider__pagination',
      clickable: true,
    },
    breakpoints: {
      1919: {
        spaceBetween: 35,
      },
      1023: {
        spaceBetween: 39,
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 35,
      }
    }
  });
})();

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
