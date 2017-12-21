'use strict';

(function () {

  var resizeStep = 25;
  var maxResizeValue = 100;
  var minResizeValue = 25;

  window.initializeScale = {

    scale: function (scaleElement, scale) {
      scaleElement.addEventListener('click', function (e) {
        if (e.target === window.reducePicture) {
          var value = parseInt(window.resizeValue.value, 10) - resizeStep;
          if (value < minResizeValue) {
            return;
          }
          window.resizeValue.value = value + '%';
          scale(value);
        }

        if (e.target === window.increasePicture) {
          value = parseInt(window.resizeValue.value, 10) + resizeStep;
          if (value > maxResizeValue) {
            return;
          }
          window.resizeValue.value = value + '%';
          scale(value);
        }
      });
    }
  };

})();

