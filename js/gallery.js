'use strict';
(function () {

  var picturesGallary = document.querySelector('.pictures');

  window.pictures = [];

  window.data.getPicturesArray(window.pictures, window.urls, window.comments);

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.pictures.length; j++) {
    fragment.appendChild(window.picture.render(window.pictures[j]));
  }
  picturesGallary.appendChild(fragment);

})();

