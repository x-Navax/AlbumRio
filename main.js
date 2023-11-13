
function start() {
  gapi.load('client', loadDriveAPI);
}

function loadDriveAPI() {
  gapi.client.init({
      apiKey: 'AIzaSyAm8rLPYTHr6JGjqJ8CxGiwdzm9QpMm-XY',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  }).then(listFiles);
}

function listFiles() {
  gapi.client.drive.files.list({
      q: "'1kebSm7_K0eCXfx5by28ZOVHMMLEGxvn2' in parents",
      fields: "files(id, name, webContentLink, webViewLink)" // Agregamos webViewLink para el enlace de vista en Drive
  }).then(function(response) {
      var files = response.result.files;
      var imageContainer = document.getElementById('imageContainer');
      if (files && files.length > 0) {
        files.forEach(function(file) {
            var img = document.createElement('img');
            img.src = file.webContentLink;
            img.alt = file.name;

            var downloadButton = document.createElement('a');
            downloadButton.textContent = 'Descargar';
            downloadButton.href = file.webContentLink; // Enlace directo al archivo
            downloadButton.download = file.name; // Nombre de archivo para la descarga
            downloadButton.setAttribute('target', '_blank'); // Abre el enlace en una nueva pestaña

            var imageWrapper = document.createElement('div');
            imageWrapper.appendChild(img);
            imageWrapper.appendChild(downloadButton);

            imageContainer.appendChild(imageWrapper);
        });
    } else {
        console.log('No se encontraron archivos.');
      }
  });
}

function onGoogleScriptLoad() {
  gapi.load('client', start);
}