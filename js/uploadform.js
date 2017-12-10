'use strict';
// работа с фото в uploadform //

(function () {

// фильтры для фото //

  window.images = document.querySelector('.effect-image-preview');
  var effects = document.querySelector('.upload-effect');
  var effectsClasses = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin',
    'effect-phobos', 'effect-heat'];

  effects.addEventListener('click', function (e) {
    var effect = e.target.id.replace('upload-', '');

    if (effectsClasses.indexOf(effect) !== -1) {
      window.data.clearClassList(window.images);
      window.images.classList.add(effect);
    }
  });

  // уменьшение увеличение фото //

  var reducePicture = document.querySelector('.upload-resize-controls-button-dec');
  var increasePicture = document.querySelector('.upload-resize-controls-button-inc');
  window.resizeValue = document.querySelector('.upload-resize-controls-value');
  window.defaultResizeValue = 100;
  window.resizeStep = 25;
  window.maxResizeValue = 100;
  window.minResizeValue = 25;

  reducePicture.addEventListener('click', function () {
    window.data.reduceImage();

  });

  increasePicture.addEventListener('click', function () {
    window.data.increaseImage();
  });

  // хеш - теги к фото //

  window.hashtags = document.querySelector('.upload-form-hashtags');

  window.hashtags.addEventListener('keydown', function () {
    window.data.validationOutline();
  });

  // кнопка Отправить //

  var submitButton = document.querySelector('#upload-submit');
  window.form = document.querySelector('.upload-form');

  submitButton.addEventListener('click', function () {
    window.data.validationMessage();
  });

  submitButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.data.validationMessage();
    }
  });

})();
