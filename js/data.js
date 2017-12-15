'use strict';

(function () {
  var size = 25;

  window.comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  window.urls = [];
  for (var i = 1; i < size + 1; i++) {
    window.urls[i - 1] = 'photos/' + [i] + '.jpg';
  }
  function shuffleArray(arr) {
    arr.sort(function () {
      return 0.5 - Math.random();
    });
  }
  shuffleArray(window.urls);

  function getRandomComments(commentsArray) {
    var commentsCount = getRandomNumber(1, 2);
    shuffleArray(commentsArray);
    var randomComments = [];

    for (var k = 0; k < commentsCount; k++) {
      randomComments[k] = commentsArray[k];
    }
    return randomComments;
  }

  window.data = {

    getPicturesArray: function (picture, url, comment) {
      for (var m = 0; m < size; m++) {
        picture[m] = {
          url: url[m],
          likes: getRandomNumber(15, 200),
          comments: getRandomComments(comment)
        };
      }
    }
  };

})();

