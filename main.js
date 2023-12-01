
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
  var nextPageToken = null;

  function retrieveFiles() {
      gapi.client.drive.files.list({
          q: "'14ALugkifVa9_28U-p78NicBUNPYvTIhq' in parents",
          fields: "nextPageToken, files(id, name, webContentLink, webViewLink)",
          pageSize: 1000, // Define el tamaño máximo de página (máximo permitido por la API)
          pageToken: nextPageToken // Utiliza el token de la página siguiente si hay más resultados
      }).then(function(response) {
          var files = response.result.files;
          nextPageToken = response.result.nextPageToken; // Guarda el token de la página siguiente para la siguiente llamada

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

              if (nextPageToken) {
                  retrieveFiles(); // Si hay más archivos, obtener la siguiente página
              }
          } else {
              console.log('No se encontraron archivos.');
          }
      });
  }

  retrieveFiles(); // Llamada inicial para comenzar a obtener los archivos
}


function onGoogleScriptLoad() {
  gapi.load('client', start);
}