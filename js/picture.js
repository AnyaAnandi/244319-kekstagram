'use strict';

(function () {

  window.picture = {

    renderPicture: function (picture) {
      var pictureElement = window.picturesTemplate.cloneNode(true);
      var image = pictureElement.querySelector('img');
      image.setAttribute('src', picture.url);
      pictureElement.querySelector('.picture-likes').textContent = picture.likes;
      pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
      return pictureElement;
    }
  };

})();

