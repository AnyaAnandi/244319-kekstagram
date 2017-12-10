'use strict';
// 25 фото галереи //

(function () {
  // url для фото //

  var urls = [];

  for (var i = 1; i < window.data.size + 1; i++) {
    urls[i - 1] = 'photos/' + [i] + '.jpg';
  }
  window.data.shuffleArray(urls);

  // комментарии к фото //

  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


  // получение массива фото //

  window.pictures = [];
  for (var j = 0; j < window.data.size; j++) {
    window.pictures[j] = {
      url: urls[j],
      likes: window.data.getRandomNumber(15, 200),
      comments: window.data.getRandomComments(comments)
    };
  }

  // вставка всех фото - template //

  var picturesGallary = document.querySelector('.pictures');
  window.picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  window.galleryOverlay = document.querySelector('.gallery-overlay');


  var fragment = document.createDocumentFragment();

  for (var k = 0; k < window.pictures.length; k++) {
    fragment.appendChild(window.data.renderPicture(window.pictures[k]));
  }
  picturesGallary.appendChild(fragment);

})();
