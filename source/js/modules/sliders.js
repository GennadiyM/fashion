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
