'use strict';
// открытие закрытие 25 фото в галлерее //

(function () {
  var pictureElements = document.querySelectorAll('.picture');
  var pictureClose = document.querySelector('.gallery-overlay-close');

  for (var i = 0; i < pictureElements.length; i++) {

    (function (j) {
      pictureElements[j].addEventListener('click', function (event) {
        event.preventDefault();
        window.openclose.openGalleryOverlay(window.pictures[j]);
        document.addEventListener('keydown', window.openclose.onGalleryEscPress);
      });

      pictureElements[j].addEventListener('keydown', function (evt, event) {
        event.preventDefault();
        window.openclose.onPictureEnterPress(evt, window.pictures[j]);
      });
    })(i);
  }

  pictureClose.addEventListener('click', function () {
    window.openclose.closeGalleryOverlay();
  });

  pictureClose.addEventListener('keydown', function (evt) {
    window.openclose.isEnterPress(evt, window.openclose.closeGalleryOverlay);
  });
})();

/*
  var pictureElements = document.querySelectorAll('.picture');
  var pictureClose = document.querySelector('.gallery-overlay-close');

  for (var i = 0; i < pictureElements.length; i++) {

    (function (j) {
      pictureElements[j].addEventListener('click', function (evt) {
        evt.preventDefault();
        window.openclose.openGalleryOverlay(window.pictures[j]);
        document.addEventListener('keydown', function (evt) {
         window.openclose.isEcsPress(evt, window.openclose.closeGalleryOverlay);
      });
      });

      pictureElements[j].addEventListener('keydown', function (evt, event) {
        evt.preventDefault();

        window.openclose.isEnterPress(event, window.openclose.openGalleryOverlay(window.pictures[j]));
      });
    })(i);
  }

  pictureClose.addEventListener('click', function () {
    window.openclose.closeGalleryOverlay();
  });

  pictureClose.addEventListener('keydown', function (evt) {
    window.openclose.isEnterPress(evt, window.openclose.closeGalleryOverlay);
  });
})();
*/
