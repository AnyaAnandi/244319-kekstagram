'use strict';

(function () {

  var uploadFileFeeld = document.querySelector('#upload-file');
  window.uploadFileForm = document.querySelector('.upload-overlay');
  var uploadFileFormClose = document.querySelector('.upload-form-cancel');
  var commentOnFocus = document.querySelector('.upload-form-description');

  uploadFileFeeld.addEventListener('change', function (evt) {
    evt.stopPropagation();
    window.openclose.openUploadForm();
  });

  uploadFileFormClose.addEventListener('click', function () {
    window.openclose.closeUploadForm();
  });

  uploadFileFormClose.addEventListener('keydown', function (evt) {
    window.openclose.isEnterPress(evt, window.openclose.closeUploadForm);
  });

  document.addEventListener('keydown', function (evt) {
    window.openclose.isEscPress(evt, window.openclose.closeUploadForm());
  });

  commentOnFocus.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

})();
