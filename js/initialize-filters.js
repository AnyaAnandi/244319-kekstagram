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
    onFiltersChange: function (filterElement, changeFilter) {

      filterElement.addEventListener('click', function (e) {

        window.effect = e.target.id.replace('upload-', '');


        window.images.classList.add('window.effect');
        window.pinHandle.style.left = 100 + '%';
        window.filterBar.style.width = 100 + '%';
        window.rangeInput.value = 100;

        changeFilter(window.rangeInput);

        if (window.effect !== 'effect-none') {
          window.filter.classList.remove('hidden');
        } else {
          window.filter.classList.add('hidden');
        }
      });
    },

    // применение ползунка //

    onPinChange: function (pin, changeFilter) {

      pin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var pinCoords = getCoords(pin);
        var shiftX = evt.pageX - pinCoords.left;
        var filterCoords = getCoords(window.filter);

        function onMouseMove(event) {
          event.preventDefault();
          var newLeft = event.pageX - shiftX - filterCoords.left;

          if (newLeft < 0) {
            newLeft = 0;
          }
          var rightEdge = window.filter.offsetWidth - pin.offsetWidth - 20;
          if (newLeft > rightEdge) {
            newLeft = rightEdge;
          }

          pin.style.left = newLeft + 'px';
          window.filterBar.style.width = newLeft + 'px';

          window.rangeInput.value = parseInt((newLeft * 100) / rightEdge, 10);

          changeFilter(window.rangeInput);
        }

        function onMouseUp(upEvt) {
          upEvt.preventDefault();

          window.filter.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }

        window.filter.addEventListener('mousemove', onMouseMove);
        window.document.addEventListener('mouseup', onMouseUp);

      });
    }
  };

})();

