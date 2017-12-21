'use strict';

(function () {
  var URL = 'https://1510.dump.academy/kekstagram';
  var URLforLoad = 'https://1510.dump.academy/kekstagram/data';

  window.backend = {
    save: function (data, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onError(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },

    load: function (onLoad) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URLforLoad);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });


      xhr.send();
    }

  };

})();

