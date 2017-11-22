'use strict';
// размер массива

var size = 25;


// переменная куда будет копироваться шаблон

var picturesGallary = document.querySelector('.pictures');


// переменная самого шаблона

var picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');


// переменная всплывающего окна

var gallaryOverlay = document.querySelector('.gallery-overlay');


//  создаю массив лайков

function getRandomLikes(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var likes = [];
for (var i = 0; i < 25; i++) {
  likes[i] = getRandomLikes(15, 200);
}


// массив url так что бы фото в разнобой шли
// ???? и итоге не подставляется 1 картинка ?????

var arr = [];
var urls = [];

for (var k = 1; k <= size; k++) {
  arr[k] = 'photos/' + [k] + '.jpg';
}


for (var l = 0; l <= size - 1; l++) {
  var value = arr.splice(Math.floor(Math.random() * ((size - l) - 1) + 1), 1);
  urls.push(value.pop());
}


// общий массив из урл и лайков

var pictures = [];

for (var m = 0; m <= size; m++) {
  pictures[m] = {
    url: urls[m],
    like: likes[m]
  };
}


// массив комментариве

/* var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']; */


function renderPicture(arry) {
  var pictureElement = picturesTemplate.cloneNode(true);
  var image = pictureElement.querySelector('img');
  image.setAttribute('src', arry.url);
  pictureElement.querySelector('.picture-likes').textContent = arry.like;
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

