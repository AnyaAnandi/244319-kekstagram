'use strict';

(function () {

  window.filter = document.querySelector('.upload-effect-level');
  var pinHandle = document.querySelector('.upload-effect-level-pin');
  var filterBar = document.querySelector('.upload-effect-level-val');
  var rangeInput = document.querySelector('.upload-effect-level-value');

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
        pinHandle.style.left = 100 + '%';
        filterBar.style.width = 100 + '%';
        rangeInput.value = 100;

        changeFilter(rangeInput);

        if (window.effect !== 'effect-none') {
          window.filter.classList.remove('hidden');
        } else {
          window.filter.classList.add('hidden');
        }

        // применение ползунка //

        pinHandle.addEventListener('mousedown', function (evt) {
          evt.preventDefault();
          var pinCoords = getCoords(pinHandle);
          var shiftX = evt.pageX - pinCoords.left;
          var filterCoords = getCoords(window.filter);

          function onMouseMove(event) {
            event.preventDefault();
            var newLeft = event.pageX - shiftX - filterCoords.left;

            if (newLeft < 0) {
              newLeft = 0;
            }
            var rightEdge = window.filter.offsetWidth - pinHandle.offsetWidth - 20;
            if (newLeft > rightEdge) {
              newLeft = rightEdge;
            }

            pinHandle.style.left = newLeft + 'px';
            filterBar.style.width = newLeft + 'px';

            rangeInput.value = parseInt((newLeft * 100) / rightEdge, 10);

            changeFilter(rangeInput);
          }

          function onMouseUp(upEvt) {
            upEvt.preventDefault();

            window.filter.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          }

          window.filter.addEventListener('mousemove', onMouseMove);
          window.document.addEventListener('mouseup', onMouseUp);

        });
      });
    }
  };

})();

