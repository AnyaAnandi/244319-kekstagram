'use strict';
// размер массива

var size = 25;

// переменная куда будет копироваться шаблон

var picturesGallary = document.querySelector('.pictures');

// переменная самого шаблона

var picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

// переменная всплывающего окна

var gallaryOverlay = document.querySelector('.gallery-overlay');

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var urls = [];
var pictures = [];

//  функция для массив лайков

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

for (var i = 1; i < size + 1; i++) {
  urls[i - 1] = 'photos/' + [i] + '.jpg';
}

function shuffleArray(arr) {
  arr.sort(function () {
    return 0.5 - Math.random();
  });
}
shuffleArray(urls);
var commentsCount = getRandomNumber(1, 2);

function getRandomComments(commentsArray) {
  shuffleArray(commentsArray);
  var randomComments = [];

  for (var k = 0; k < commentsCount; k++) {
    randomComments[k] = commentsArray[k];
  }
  return randomComments;
}

for (var m = 0; m <= size; m++) {
  pictures[m] = {
    url: urls[m],
    likes: getRandomNumber(15, 200),
    comments: getRandomComments(comments)
  };
}

function renderPicture(picture) {
  var pictureElement = picturesTemplate.cloneNode(true);
  var image = pictureElement.querySelector('img');
  image.setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
  return pictureElement;
}

var fragment = document.createDocumentFragment();

for (var j = 0; j < pictures.length; j++) {
  fragment.appendChild(renderPicture(pictures[j]));
}
picturesGallary.appendChild(fragment);

gallaryOverlay.classList.remove('hidden');
var overlayImage = gallaryOverlay.querySelector('img');
overlayImage.setAttribute('src', pictures[1].url);
gallaryOverlay.querySelector('.likes-count').textContent = pictures[1].likes;
gallaryOverlay.querySelector('.comments-count').textContent = pictures[1].comments.length;

