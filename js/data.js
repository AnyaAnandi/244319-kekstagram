'use strict';

(function () {
  window.data = {
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

      for (var k = 0; k < commentsCount; k++) {
        randomComments[k] = commentsArray[k];
      }
      return randomComments;
    },

    getPicturesArray: function (picture, url, comment) {
      for (var m = 0; m < window.size; m++) {
        picture[m] = {
          url: url[m],
          likes: window.data.getRandomNumber(15, 200),
          comments: window.data.getRandomComments(comment)
        };
      }
    }

  };
})();
