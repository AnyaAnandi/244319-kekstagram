'use strict';

(function () {

  var defaultResizeValue = 100;
  var resizeStep = 25;
  var maxResizeValue = 100;
  var minResizeValue = 25;

  function reduceIncrease(targ, scale) {
    if (targ === window.reducePicture) {
      var value = parseInt(window.resizeValue.value, 10) - resizeStep;
      if (value < minResizeValue) {
        return;
      }
      window.resizeValue.value = value + '%';
      scale(value);
    }

    if (targ === window.increasePicture) {
      value = parseInt(window.resizeValue.value, 10) + resizeStep;
      if (value > maxResizeValue) {
        return;
      }
      window.resizeValue.value = value + '%';
      scale(value);
    }
  }

  window.initializeScale = {

    scale: function (scaleElement) {
      scaleElement.addEventListener('click', function (e) {
        var scalePictureTarget = e.target;
        reduceIncrease(scalePictureTarget, window.scaleImage.scale);
      });
    },

    resetResizeValue: function () {
      window.resizeValue.value = defaultResizeValue + '%';
      window.scaleImage.scale(defaultResizeValue);
    }
  };

})();

