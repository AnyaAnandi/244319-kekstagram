'use strict';

(function () {

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  window.initializeFilters = {
    filters: function (pin, fil, bar, val) {

      pin.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var pinCoords = getCoords(pin);
        var shiftX = e.pageX - pinCoords.left;
        var rightEdge = fil.offsetWidth - pin.offsetWidth - 20;
        var filterCoords = getCoords(fil);

        function onMouseMove(evt) {
          evt.preventDefault();
          var newLeft = evt.pageX - shiftX - filterCoords.left;

          if (newLeft < 0) {
            newLeft = 0;
          }

          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }

          pin.style.left = newLeft + 'px';
          bar.style.width = newLeft + 'px';
          val.value = parseInt((newLeft * 100) / rightEdge, 10);

          window.filtersStyle.styles(val);

        }

        function onMouseUp(upEvt) {
          upEvt.preventDefault();
          fil.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }

        fil.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };

})();

