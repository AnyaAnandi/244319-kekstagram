'use strict';
// функции для открытия и закрытия //

(function () {
  window.openclose = {
    ESC_KEYCODE: 27,

    ENTER_KEYCODE: 13,

    openGalleryOverlay: function (picture) {
      window.galleryOverlay.classList.remove('hidden');
      var overlayImage = window.galleryOverlay.querySelector('img');
      overlayImage.setAttribute('src', picture.url);
      window.galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
      window.galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;
    },

    closeGalleryOverlay: function () {
      window.galleryOverlay.classList.add('hidden');
    },

    isEcsPress: function (evt, action) {
      if (evt.keyCode === window.openclose.ESC_KEYCODE) {
        action();
      }
    },

    isEnterPress: function (evt, action) {
      if (evt.keyCode === window.openclose.ENTER_KEYCODE) {
        action();
      }
    },

    onGalleryEscPress: function (evt) {
      window.openclose.isEcsPress(evt, window.openclose.closeGalleryOverlay);
    },

    onPictureEnterPress: function (evt, picture) {
      window.openclose.isEnterPress(evt, window.openclose.openGalleryOverlay(picture));
    },

    closeUploadForm: function () {
      window.uploadFileForm.classList.add('hidden');
      window.data.resetImageFilter(window.images);
      window.data.resetResizeValue();
    },

    openUploadForm: function () {
      window.uploadFileForm.classList.remove('hidden');
    }

  };

})();

