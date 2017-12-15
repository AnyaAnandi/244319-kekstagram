'use strict';
(function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  var pictureElements = document.querySelectorAll('.picture');
  var pictureClose = document.querySelector('.gallery-overlay-close');

  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;


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
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeGalleryOverlay();
    }
  }

  for (var p = 0; p < pictureElements.length; p++) {

    (function (d) {
      pictureElements[d].addEventListener('click', function (event) {
        event.preventDefault();
        openGalleryOverlay(window.pictures[d]);
        document.addEventListener('keydown', onGalleryEscPress);
      });

      pictureElements[d].addEventListener('keydown', function (event) {
        // event.preventDefault();
        if (event.keyCode === window.ENTER_KEYCODE) {
          openGalleryOverlay(window.pictures[d]);
        }
      });
    })(p);
  }

  pictureClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  pictureClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      closeGalleryOverlay();
    }
  });
})();
