(function () {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  const ajaxGet = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      contentType: false,
      processData: false,
      success: (data) => {
        SwimTeam.move(data);
      },
      error: function () {
        console.error('Failed');
      }
    });
  }

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }
    console.log(typeof file)
    ajaxFileUplaod(file);
    if (ajaxFileUplaod) {
      $('.pool').css('background-image', `url(${serverUrl}/fileupload)`);
    }
  });

  $('.pool').css('background-image', `url(${serverUrl}/bg)`);
  setInterval(ajaxGet, 500);

})();
