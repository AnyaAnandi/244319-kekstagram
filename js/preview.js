'use strict';
(function () {

  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  function openGalleryOverlay(picture) {
    window.galleryOverlay.classList.remove('hidden');

    var overlayImage = window.galleryOverlay.querySelector('img');
    overlayImage.setAttribute('src', picture.url);
    window.galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    window.galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;

  }

  function closeGalleryOverlay() {
    window.galleryOverlay.classList.add('hidden');
  }

  function onGalleryEscPress(evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closeGalleryOverlay();
    }
  }
  window.previewInit = {

    onPreviewImg: function (pictureElement, pictures) {
      for (var p = 0; p < pictureElement.length; p++) {

        (function (d) {
          pictureElement[d].addEventListener('click', function (event) {
            event.preventDefault();
            openGalleryOverlay(pictures[d]);
            document.addEventListener('keydown', onGalleryEscPress);
          });

          pictureElement[d].addEventListener('keydown', function (event) {
            // event.preventDefault();
            if (event.keyCode === window.ENTER_KEYCODE) {
              openGalleryOverlay(pictures[d]);
            }
          });
        })(p);
      }

      window.pictureClose.addEventListener('click', function () {
        closeGalleryOverlay();
      });

      window.pictureClose.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          closeGalleryOverlay();
        }
      });
    }
  };

})();
