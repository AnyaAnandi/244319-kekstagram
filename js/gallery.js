'use strict';
(function () {


  var picturesGallary = document.querySelector('.pictures');
  var gallerySize = 25;

  // window.pictures = [];

  // window.data.getPicturesArray(window.pictures, window.urls, window.comments);

  function getPictures(pictures) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < gallerySize; j++) {
      fragment.appendChild(window.picture.render(pictures[j]));
    }
    picturesGallary.appendChild(fragment);

    window.galleryOverlay = document.querySelector('.gallery-overlay');
    var pictureElements = document.querySelectorAll('.picture');
    window.pictureClose = document.querySelector('.gallery-overlay-close');

    window.previewInit.onPreviewImg(pictureElements, pictures);
  }

  function errorHandler(errorMessage) {
    window.canvas.messageError(errorMessage);
  }

  window.backend.load(getPictures, errorHandler);

})();

