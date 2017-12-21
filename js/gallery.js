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

    window.previewInit.onPreviewImg(pictures);
  }

  window.backend.load(getPictures);

})();

