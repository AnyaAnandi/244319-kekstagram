'use strict';
(function () {

  var canvas = document.getElementById('canvas');

  var bodySize = document.body.getBoundingClientRect();
  canvas.setAttribute('width', bodySize.width);
  canvas.setAttribute('height', bodySize.width);

  var ctx = canvas.getContext('2d');

  window.canvas = {

    messageError: function (error) {

      ctx.fillStyle = 'blue';
      ctx.fillRect(0, 500, canvas.width, 60);
      ctx.fillStyle = 'red';
      ctx.font = '30px PT Arial';
      ctx.textAlign = 'center';
      ctx.fillText(error, canvas.width / 2, 540);

    }
  };
})();

