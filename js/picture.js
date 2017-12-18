'use strict';

(function () {
  var picturesTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.picture = {

    render: function (picture) {
      var pictureElement = picturesTemplate.cloneNode(true);
      var image = pictureElement.querySelector('img');
      image.setAttribute('src', picture.url);
      pictureElement.querySelector('.picture-likes').textContent = picture.likes;
      pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
      return pictureElement;
    }
  };

})();

