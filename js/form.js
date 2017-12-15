'use strict';
(function () {
  var uploadFileFeeld = document.querySelector('#upload-file');
  var uploadFileForm = document.querySelector('.upload-overlay');
  var uploadFileFormClose = document.querySelector('.upload-form-cancel');

  function closeUploadForm() {
    uploadFileForm.classList.add('hidden');
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
      pinHandle.style.left = 0;
      filterBar.style.width = 0;
      rangeInput.value = 0;
      images.style.filter = 'none';

      if (window.effect !== 'effect-none') {
        filter.classList.remove('hidden');
      } else {
        filter.classList.add('hidden');
      }
    }
  });

  var reducePicture = document.querySelector('.upload-resize-controls-button-dec');
  var increasePicture = document.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var defaultResizeValue = 100;
  var resizeStep = 25;
  var maxResizeValue = 100;
  var minResizeValue = 25;

  function resetResizeValue() {
    resizeValue.value = defaultResizeValue + '%';
    var transformScaleReduce = defaultResizeValue / 100;
    images.style.transform = 'scale(' + transformScaleReduce + ')';
  }

  function resetImageFilter() {
    clearClassList(images);
    images.classList.add('effect-none');
    filter.classList.add('hidden');
  }

  reducePicture.addEventListener('click', function () {
    var value = parseInt(resizeValue.value, 10) - resizeStep;
    if (value < minResizeValue) {
      return;
    }
    resizeValue.value = value + '%';
    var transformScaleReduce = value / 100;
    images.style.transform = 'scale(' + transformScaleReduce + ')';
  });

  increasePicture.addEventListener('click', function () {
    var value = parseInt(resizeValue.value, 10) + resizeStep;
    if (value > maxResizeValue) {
      return;
    }
    resizeValue.value = value + '%';
    var transformScaleIncrease = value / 100;
    images.style.transform = 'scale(' + transformScaleIncrease + ')';
  });

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

  var submitButton = document.querySelector('#upload-submit');
  var form = document.querySelector('.upload-form');

  submitButton.addEventListener('click', function () {
    var error = validate(hashtags.value);
    if (error) {
      hashtags.setCustomValidity(error);
      hashtags.classList.add('red');
      return;
    }
    form.submit();
    hashtags.classList.remove('red');
    form.reset();
    resetResizeValue();
    resetImageFilter();
    images.style.filter = 'none';
  });

  submitButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      var error = validate(hashtags.value);
      if (error) {
        hashtags.setCustomValidity(error);
        hashtags.classList.add('red');
        return;
      }
      form.submit();
      hashtags.classList.remove('red');
      form.reset();
      resetResizeValue();
      resetImageFilter();
    }
  });

  // ползунок

  var filter = document.querySelector('.upload-effect-level');
  var pinHandle = document.querySelector('.upload-effect-level-pin');
  var filterBar = document.querySelector('.upload-effect-level-val');
  var rangeInput = document.querySelector('.upload-effect-level-value');
  filter.classList.add('hidden');

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  pinHandle.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var pinCoords = getCoords(pinHandle);
    var shiftX = e.pageX - pinCoords.left;
    var filterCoords = getCoords(filter);

    function onMouseMove(evt) {
      evt.preventDefault();
      var newLeft = evt.pageX - shiftX - filterCoords.left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = filter.offsetWidth - pinHandle.offsetWidth - 20;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      pinHandle.style.left = newLeft + 'px';
      filterBar.style.width = newLeft + 'px';
      rangeInput.value = parseInt((newLeft * 100) / rightEdge, 10);

      if (window.effect === 'effect-chrome') {
        rangeInput.value = rangeInput.value / 100;
        images.style.filter = 'grayscale(' + rangeInput.value + ')';
      }
      if (window.effect === 'effect-sepia') {
        rangeInput.value = rangeInput.value / 100;
        images.style.filter = 'sepia(' + rangeInput.value + ')';
      }
      if (window.effect === 'effect-marvin') {
        images.style.filter = 'invert(' + rangeInput.value + '%)';
      }
      if (window.effect === 'effect-phobos') {
        rangeInput.value = parseFloat(rangeInput.value / 20, 10).toFixed(1);

        images.style.filter = 'blur(' + rangeInput.value + 'px)';
      }
      if (window.effect === 'effect-heat') {
        rangeInput.value = parseFloat(rangeInput.value / 33, 10).toFixed(1);
        images.style.filter = 'brightness(' + rangeInput.value + ')';
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      filter.removeEventListener('mousemove', onMouseMove);
      filter.removeEventListener('mouseup', onMouseUp);
    }

    filter.addEventListener('mousemove', onMouseMove);
    filter.addEventListener('mouseup', onMouseUp);

  });
})();
