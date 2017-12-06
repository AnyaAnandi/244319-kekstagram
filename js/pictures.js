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

function closeUploadForm() {
  uploadFileForm.classList.add('hidden');
}

function onUploadFormEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadForm();
  }
}

uploadFileFeeld.addEventListener('change', function (event) {
  uploadFileForm.classList.remove('hidden');
  event.stopPropagation();

  document.addEventListener('keydown', onUploadFormEscPress);
});


var commentOnFocus = document.querySelector('.upload-form-description');

commentOnFocus.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    event.stopPropagation();
  }
});

uploadFileFormClose.addEventListener('click', closeUploadForm);

uploadFileFormClose.addEventListener('click', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUploadForm();
  }
});

var images = document.querySelector('.effect-image-preview');
var effects = document.querySelector('.upload-effect');

function clearClassList(image) {
  image.classList.remove('effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin',
      'effect-phobos', 'effect-heat');
}

var effectsArray = document.querySelectorAll('input[name = effect]');
var effectsClasses = ['effect-none', 'effect-chrome', 'effect-sepia', 'effect-marvin',
  'effect-phobos', 'effect-heat'];


effects.addEventListener('click', function (e) {
  for (var h = 0; h < effectsArray.length; h++) {

    if (e.target.id === effectsArray[h].id) {
      var effect = e.target.id.replace('upload-', '');

      if (effectsClasses.indexOf(effect) !== -1) {
        clearClassList(images);
        images.classList.add(effect);
      }
    }
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

function resetForm() {
  resizeValue.value = defaultResizeValue + '%';
  var value = parseInt(resizeValue.value, 10);
  var transformScaleReduce = value / 100;
  images.style.transform = 'scale(' + transformScaleReduce + ')';

  var effectDefault = 'effect-none';
  clearClassList(images);
  images.classList.add(effectDefault);
}

reducePicture.addEventListener('click', function () {
  var value = parseInt(resizeValue.value, 10) - resizeStep;
  if (value < minResizeValue) {
    return;
  }
  resizeValue.value = value + '%';
  var transformScaleReduce = value / 100;
  images.style.transform = 'scale(' + transformScaleReduce + ')';
});

increasePicture.addEventListener('click', function () {
  var value = parseInt(resizeValue.value, 10) + resizeStep;
  if (value > maxResizeValue) {
    return;
  }
  resizeValue.value = value + '%';
  var transformScaleIncrease = value / 100;
  images.style.transform = 'scale(' + transformScaleIncrease + ')';
});


var hashtags = document.querySelector('.upload-form-hashtags');

function validate(hashtag) {
  var spaceForSplit = ' ';
  var maxLength = 5;
  var hashtagsSplit = hashtag.split(spaceForSplit);

  var hashtagsMap = {};

  if (hashtagsSplit.length > maxLength) {
    return 'максимальное число хеш-тегов 5';
  }

  for (var b = 0; b < hashtagsSplit.length - 1; b++) {
    hashtagsSplit[b] = hashtagsSplit[b].toLowerCase();

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

}

hashtags.addEventListener('keydown', function () {
  var error = validate(hashtags.value);
  if (error) {
    hashtags.setCustomValidity(error);
  }
  hashtags.classList.remove('red');
  return;
});

var button = document.querySelector('#upload-submit');
var form = document.querySelector('.upload-form');

button.addEventListener('click', function () {
  var error = validate(hashtags.value);
  if (error) {
    hashtags.setCustomValidity(error);
    // hashtags.style.outline = '2px solid red';
    hashtags.classList.add('red');
    return;
  }
  form.submit();
  resetForm();
  hashtags.classList.remove('red');
});

button.addEventListener('click', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var error = validate(hashtags.value);
    if (error) {
      hashtags.setCustomValidity(error);
      hashtags.style.outline = '2px solid red';
      return;
    }
    form.submit();
    hashtags.classList.remove('red');
    resetForm();
  }
});
