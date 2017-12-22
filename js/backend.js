'use strict';

(function () {
  var URL = 'https://1510.dump.academy/kekstagram';
  var URLforLoad = 'https://1510.dump.academy/kekstagram/data';

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.addEventListener('load', function () {
        onError(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },

    load: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Непонятный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Сервер не отвечает в течении ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000000000;

      xhr.open('GET', URLforLoad);
      xhr.send();
    }

  };

})();

