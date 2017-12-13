'use strict';
(function () {
  window.size = 25;
  var picturesGallary = document.querySelector('.pictures');
  window.picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var urls = [];
  window.pictures = [];

  for (var i = 1; i < window.size + 1; i++) {
    urls[i - 1] = 'photos/' + [i] + '.jpg';
  }

  window.data.shuffleArray(urls);
  window.data.getPicturesArray(window.pictures, urls, comments);

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.pictures.length; j++) {
    fragment.appendChild(window.picture.renderPicture(window.pictures[j]));
  }
  picturesGallary.appendChild(fragment);

})();

