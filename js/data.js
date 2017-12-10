'use strict';

(function () {

  window.data = {

    size: 25,

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    shuffleArray: function (arr) {
      arr.sort(function () {
        return 0.5 - Math.random();
      });
    },

    getRandomComments: function (commentsArray) {
      var commentsCount = window.data.getRandomNumber(1, 2);
      window.data.shuffleArray(commentsArray);
      var randomComments = [];

      for (var i = 0; i < commentsCount; i++) {
        randomComments[i] = commentsArray[i];
      }
      return randomComments;
    },

    renderPicture: function (picture) {
      var pictureElement = window.picturesTemplate.cloneNode(true);
      var image = pictureElement.querySelector('img');
      image.setAttribute('src', picture.url);
      pictureElement.querySelector('.picture-likes').textContent = picture.likes;
      pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
      return pictureElement;
    },

    clearClassList: function (image) {
      image.classList.remove('effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin',
          'effect-phobos', 'effect-heat');
    },

    resetImageFilter: function (image) {
      window.data.clearClassList(image);
      image.classList.add('effect-none');
    },

    resetResizeValue: function () {
      window.resizeValue.value = window.defaultResizeValue + '%';
      var transformScaleReduce = window.defaultResizeValue / 100;
      window.images.style.transform = 'scale(' + transformScaleReduce + ')';
    },

    validate: function (hashtag) {
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
    },

    addRedOutline: function () {
      window.hashtags.classList.add('red');
    },

    removeRedOutline: function () {
      window.hashtags.classList.remove('red');
    },

    reduceImage: function () {
      var value = parseInt(window.resizeValue.value, 10) - window.resizeStep;
      if (value < window.minResizeValue) {
        return;
      }
      window.resizeValue.value = value + '%';
      var transformScaleReduce = value / 100;
      window.images.style.transform = 'scale(' + transformScaleReduce + ')';
    },

    increaseImage: function () {
      var value = parseInt(window.resizeValue.value, 10) + window.resizeStep;
      if (value > window.maxResizeValue) {
        return;
      }
      window.resizeValue.value = value + '%';
      var transformScaleIncrease = value / 100;
      window.images.style.transform = 'scale(' + transformScaleIncrease + ')';
    },

    validationOutline: function () {
      var error = window.data.validate(window.hashtags.value);
      if (error) {
        // window.hashtags.setCustomValidity(error);
        window.data.addRedOutline();
        return;
      }
      window.data.removeRedOutline();
    },

    validationMessage: function () {
      var error = window.data.validate(window.hashtags.value);
      if (error) {
        window.hashtags.setCustomValidity(error);
        window.data.addRedOutline();
        return;
      }
      window.form.submit();
      window.data.removeRedOutline();
      window.form.reset();
      window.data.resetResizeValue();
      window.data.resetImageFilter(window.images);
    }

  };

})();
