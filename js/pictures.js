'use strict';
// размер массива

var size = 25;

// переменная куда будет копироваться шаблон

var picturesGallary = document.querySelector('.pictures');

// переменная самого шаблона

var picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

// переменная всплывающего окна

var galleryOverlay = document.querySelector('.gallery-overlay');

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


function getRandomComments(commentsArray) {
  var commentsCount = getRandomNumber(1, 2);
  shuffleArray(commentsArray);
  var randomComments = [];

  for (var k = 0; k < commentsCount; k++) {
    randomComments[k] = commentsArray[k];
  }
  return randomComments;
}

for (var m = 0; m < size; m++) {
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

var pictureElement = document.querySelectorAll('.picture');
var pictureClose = document.querySelector('.gallery-overlay-close');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


function openGalleryOverlay(picture) {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onGalleryEscPress);

  var overlayImage = galleryOverlay.querySelector('img');
  overlayImage.setAttribute('src', picture.url);
  galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
  galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;

}

function closeGalleryOverlay() {
  galleryOverlay.classList.add('hidden');
}

function onGalleryEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGalleryOverlay();
  }
}

for (var p = 0; p < pictureElement.length; p++) {

  (function (d) {
    pictureElement[d].addEventListener('click', function (event) {
      event.preventDefault();
      openGalleryOverlay(pictures[d]);
    });

    pictureElement[d].addEventListener('keydown', function (evt, event) {
      event.preventDefault();
      if (evt.keyCode === ENTER_KEYCODE) {
        openGalleryOverlay(pictures[d]);
      }
    });
  })(p);
}

pictureClose.addEventListener('click', function () {
  closeGalleryOverlay();
});

pictureClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGalleryOverlay();
  }
});


