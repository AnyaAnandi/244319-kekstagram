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

var pictureElements = document.querySelectorAll('.picture');
var pictureClose = document.querySelector('.gallery-overlay-close');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


function openGalleryOverlay(picture) {
  galleryOverlay.classList.remove('hidden');

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

for (var p = 0; p < pictureElements.length; p++) {

  (function (d) {
    pictureElements[d].addEventListener('click', function (event) {
      event.preventDefault();
      openGalleryOverlay(pictures[d]);
      document.addEventListener('keydown', onGalleryEscPress);
    });

    pictureElements[d].addEventListener('keydown', function (evt, event) {
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

// ///////////// module4 - task2 ////////////////////////

var uploadFileFeeld = document.querySelector('#upload-file');

var uploadFileForm = document.querySelector('.upload-overlay');

var uploadFileFormClose = document.querySelector('.upload-form-cancel');

uploadFileFeeld.addEventListener('change', function (event) {
  uploadFileForm.classList.remove('hidden');
  event.stopPropagation();

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      uploadFileForm.classList.add('hidden');
    }
  });
});

var commentOnFocus = document.querySelector('.upload-form-description');

commentOnFocus.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    event.stopPropagation();
    // event.cancelBubble = true;
  }
});

uploadFileFormClose.addEventListener('click', function () {
  uploadFileForm.classList.add('hidden');
});

uploadFileFormClose.addEventListener('click', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    uploadFileForm.classList.add('hidden');
  }
});


var button = document.querySelector('#upload-submit');
var form = document.querySelector('.upload-form');

button.addEventListener('click', function () {
  form.submit();
});

button.addEventListener('click', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    form.submit();
  }
});

var images = document.querySelector('.effect-image-preview');
var effects = document.querySelector('.upload-effect');

effects.addEventListener('click', function (e) {
  if (e.target.id === 'upload-effect-none') {
    images.classList.add('effect-none');
    images.classList.remove('effect-chrome');
    images.classList.remove('effect-sepia');
    images.classList.remove('effect-marvin');
    images.classList.remove('effect-phobos');
    images.classList.remove('effect-heat');
  } else if (e.target.id === 'upload-effect-chrome') {
    images.classList.remove('effect-none');
    images.classList.add('effect-chrome');
    images.classList.remove('effect-sepia');
    images.classList.remove('effect-marvin');
    images.classList.remove('effect-phobos');
    images.classList.remove('effect-heat');
  } else if (e.target.id === 'upload-effect-sepia') {
    images.classList.remove('effect-none');
    images.classList.remove('effect-chrome');
    images.classList.add('effect-sepia');
    images.classList.remove('effect-marvin');
    images.classList.remove('effect-phobos');
    images.classList.remove('effect-heat');
  } else if (e.target.id === 'upload-effect-marvin') {
    images.classList.remove('effect-none');
    images.classList.remove('effect-chrome');
    images.classList.remove('effect-sepia');
    images.classList.add('effect-marvin');
    images.classList.remove('effect-phobos');
    images.classList.remove('effect-heat');
  } else if (e.target.id === 'upload-effect-phobos') {
    images.classList.remove('effect-none');
    images.classList.remove('effect-chrome');
    images.classList.remove('effect-sepia');
    images.classList.remove('effect-marvin');
    images.classList.add('effect-phobos');
    images.classList.remove('effect-heat');
  } else if (e.target.id === 'upload-effect-heat') {
    images.classList.remove('effect-none');
    images.classList.remove('effect-chrome');
    images.classList.remove('effect-sepia');
    images.classList.remove('effect-marvin');
    images.classList.remove('effect-phobos');
    images.classList.add('effect-heat');
  }

});

var reducePicture = document.querySelector('.upload-resize-controls-button-dec');
var increasePicture = document.querySelector('.upload-resize-controls-button-inc');
var resizeValue = document.querySelector('.upload-resize-controls-value');
var defaultResizeValue = 100;
var resizeStep = 25;
var maxResizeValue = 100;
var minResizeValue = 25;

resizeValue.value = defaultResizeValue + '%';

reducePicture.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) > minResizeValue) {
    resizeValue.value = parseInt(resizeValue.value, 10) - resizeStep + '%';
    var transformScaleReduce = parseInt(resizeValue.value, 10) / 100;
    images.style.transform = 'scale(' + transformScaleReduce + ')';
  }
});

increasePicture.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) < maxResizeValue) {
    resizeValue.value = parseInt(resizeValue.value, 10) + resizeStep + '%';
    var transformScaleIncrease = parseInt(resizeValue.value, 10) / 100;
    images.style.transform = 'scale(' + transformScaleIncrease + ')';
  }
});

var hashtags = document.querySelector('.upload-form-hashtags');

hashtags.addEventListener('keydown', function () {
  var spaceForSplit = ' ';
  var maxLength = 5;
  var hashtagsSplit = hashtags.value.toLowerCase().split(spaceForSplit);
  // console.log(hashtagsSplit);

  var hashtagsMap = {};


  for (var b = 0; b < hashtagsSplit.length; b++) {
    hashtagsMap[hashtagsSplit[b]] = true;

    if (hashtagsSplit[b].lastIndexOf('#') !== 0) {
      hashtags.setCustomValidity('хеш-тег должен начинаться с # и состоять из одного слова');
      // hashtags.style.outline = '2px solid red';

    } else if (hashtagsMap[hashtagsSplit[b]]) {
      hashtags.setCustomValidity('нельзя использовать одинаковые хеш-теги');
    } else if (hashtagsSplit[b].length > 20) {
      hashtags.setCustomValidity('максимальная длина одного хеш-тега 20 символов');
    } else {
      hashtags.setCustomValidity('ok');
    }

    // console.log(hashtagsSplit[b]);
  }

  if (hashtagsSplit.length > maxLength) {
    hashtags.setCustomValidity('максимальная число хеш-тегов 5');
  }
});
