'use strict';
// размер массива

var size = 25;


// переменная куда будет копироваться шаблон

var picturesGallary = document.querySelector('.pictures');


// переменная самого шаблона

var picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');


// переменная всплывающего окна

var gallaryOverlay = document.querySelector('.gallery-overlay');


//  функция для массив лайков

function getRandomLikes(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// функция для массива url где еще фото перемешиваются по порядку

var arr = [];
for (var i = 1; i < size + 1; i++) {
  arr[i - 1] = 'photos/' + [i] + '.jpg';
}

var urls = [];
function getRandomUrls(a) {
  for (var k = 0; k < size; k++) {
    var value = a.splice(Math.floor(Math.random() * ((a.length - k) - 1) + 1), 1);
    urls.push(value.pop());
  }
  return urls;
}

// функция массив комментариве

function getRandomComments() {
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var randomComment = [];

  for (var n = 0; n < size; n++) {
    var rand = Math.floor(Math.random() * comments.length);
    randomComment[n] = comments[rand];
  }
  return randomComment;
}

// общий массив из урл и лайков

var pictures = [];

for (var m = 0; m <= size; m++) {
  pictures[m] = {
    url: getRandomUrls(arr)[m],
    like: getRandomLikes(15, 200),
    comment: getRandomComments()[m]
  };
}

function renderPicture(arry) {
  var pictureElement = picturesTemplate.cloneNode(true);
  var image = pictureElement.querySelector('img');
  image.setAttribute('src', arry.url);
  pictureElement.querySelector('.picture-likes').textContent = arry.like;
  pictureElement.querySelector('.picture-comments').textContent = arry.comment;
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
gallaryOverlay.querySelector('.likes-count').textContent = pictures[1].like;

