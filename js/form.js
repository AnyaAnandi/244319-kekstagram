'use strict';
(function () {
  var uploadFileFeeld = document.querySelector('#upload-file');
  var uploadFileForm = document.querySelector('.upload-overlay');
  var uploadFileFormClose = document.querySelector('.upload-form-cancel');

  function closeUploadForm() {
    uploadFileForm.classList.add('hidden');
    resetResizeValue();
    resetImageFilter();
    images.style.filter = 'none';
  }

  function onUploadFileFormClose(evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closeUploadForm();
    }
  }

  uploadFileFeeld.addEventListener('change', function (event) {
    uploadFileForm.classList.remove('hidden');
    event.stopPropagation();
  });

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === window.ESC_KEYCODE) {
      closeUploadForm();
      hashtags.classList.remove('red');
      form.reset();
      resetResizeValue();
      resetImageFilter();
      images.style.filter = 'none';
    }
  });

  var commentOnFocus = document.querySelector('.upload-form-description');

  commentOnFocus.addEventListener('keydown', function (event) {
    if (event.keyCode === window.ESC_KEYCODE) {
      event.stopPropagation();
    }
  });

  uploadFileFormClose.addEventListener('click', closeUploadForm);
  uploadFileFormClose.addEventListener('keydown', onUploadFileFormClose);

  var images = document.querySelector('.effect-image-preview');
  var effects = document.querySelector('.upload-effect');

  function clearClassList(image) {
    image.classList.remove('effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin',
        'effect-phobos', 'effect-heat');
  }

  var effectsClasses = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin',
    'effect-phobos', 'effect-heat'];

  effects.addEventListener('click', function (e) {
    window.effect = e.target.id.replace('upload-', '');

    if (effectsClasses.indexOf(window.effect) !== -1) {
      clearClassList(images);
      images.classList.add(window.effect);
      pinHandle.style.left = 100 + '%';
      filterBar.style.width = 100 + '%';
      rangeInput.value = 100;

      switch (window.effect) {
        case 'effect-none':
          images.style.filter = 'none';
          break;

        case 'effect-chrome':
          rangeInput.value = parseInt(rangeInput.value, 10) / 100;
          images.style.filter = 'grayscale(' + rangeInput.value + ')';
          break;

        case 'effect-sepia':
          rangeInput.value = parseInt(rangeInput.value, 10) / 100;
          images.style.filter = 'sepia(' + rangeInput.value + ')';
          break;

        case 'effect-marvin':
          rangeInput.value = 100;
          images.style.filter = 'invert(' + rangeInput.value + '%)';
          break;

        case 'effect-phobos':
          rangeInput.value = parseFloat(rangeInput.value / 20, 10).toFixed(1);
          images.style.filter = 'blur(' + rangeInput.value + 'px)';
          break;

        case 'effect-heat':
          rangeInput.value = parseFloat(rangeInput.value / 33, 10).toFixed(1);
          images.style.filter = 'brightness(' + rangeInput.value + ')';
          break;
      }

      if (window.effect !== 'effect-none') {
        filter.classList.remove('hidden');
      } else {
        filter.classList.add('hidden');
      }
    }
  });

  function resetResizeValue() {
    scaleImage(defaultResizeValue);
  }

  var scalePicture = document.querySelector('.upload-resize-controls');
  window.reducePicture = document.querySelector('.upload-resize-controls-button-dec');
  window.increasePicture = document.querySelector('.upload-resize-controls-button-inc');
  window.resizeValue = document.querySelector('.upload-resize-controls-value');
  var defaultResizeValue = 100;

  // callback //
  function scaleImage(val) {
    images.style.transform = 'scale(' + val / 100 + ')';
  }

  window.initializeScale.scale(scalePicture, scaleImage);

  var hashtags = document.querySelector('.upload-form-hashtags');

  function validate(hashtag) {
    var spaceForSplit = ' ';
    var maxLength = 5;
    var hashtagsSplit = hashtag.toLowerCase().split(spaceForSplit).filter(function (e) {
      return e !== '';
    });
    var hashtagsMap = {};

    if (hashtagsSplit.length > maxLength) {
      return 'максимальное число хеш-тегов 5';
    }

    for (var b = 0; b < hashtagsSplit.length; b++) {

      if (hashtagsSplit[b].lastIndexOf('#') !== 0) {
        return 'хеш-теги должены начинаться с #, разделены пробелом и состоять из одного слова';
      }

      if (hashtagsSplit[b].length > 20) {
        return 'максимальная длина одного хеш-тега 20 символов';
      }

      if (hashtagsMap[hashtagsSplit[b]] === true) {
        return 'нельзя использовать одинаковые хеш-теги';
      } hashtagsMap[hashtagsSplit[b]] = true;
    }
    return false;
  }

  hashtags.addEventListener('keydown', function () {
    var error = validate(hashtags.value);
    if (error) {
      hashtags.setCustomValidity(error);
      hashtags.classList.add('red');
      return;
    }
    hashtags.classList.remove('red');
  });

  // ползунок

  var filter = document.querySelector('.upload-effect-level');
  var pinHandle = document.querySelector('.upload-effect-level-pin');
  var filterBar = document.querySelector('.upload-effect-level-val');
  var rangeInput = document.querySelector('.upload-effect-level-value');
  filter.classList.add('hidden');

  window.filtersStyle = {
    styles: function (val) {
      switch (window.effect) {
        case 'effect-chrome':
          val.value = val.value / 100;
          images.style.filter = 'grayscale(' + val.value + ')';
          break;

        case 'effect-sepia':
          val.value = val.value / 100;
          images.style.filter = 'sepia(' + val.value + ')';
          break;

        case 'effect-marvin':
          images.style.filter = 'invert(' + val.value + '%)';
          break;

        case 'effect-phobos':
          val.value = parseFloat(val.value / 20, 10).toFixed(1);
          images.style.filter = 'blur(' + val.value + 'px)';
          break;

        case 'effect-heat':
          val.value = parseFloat(val.value / 33, 10).toFixed(1);
          images.style.filter = 'brightness(' + val.value + ')';
          break;
      }
    }
  };

  window.initializeFilters.onFiltersChange(pinHandle, filter, filterBar, rangeInput);

  function resetImageFilter() {
    clearClassList(images);
    images.classList.add('effect-none');
    filter.classList.add('hidden');
  }

  var submitButton = document.querySelector('#upload-submit');
  var form = document.querySelector('.upload-form');

  function showErrorOrSubmit(hashtag) {
    var error = validate(hashtag.value);
    if (error) {
      hashtags.setCustomValidity(error);
      hashtags.classList.add('red');
      return;
    }
    form.submit();
    hashtag.classList.remove('red');
    form.reset();
    resetResizeValue();
    resetImageFilter();
    images.style.filter = 'none';
  }

  submitButton.addEventListener('click', function () {
    showErrorOrSubmit(hashtags);
  });

  submitButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      showErrorOrSubmit(hashtags);
    }
  });

})();

