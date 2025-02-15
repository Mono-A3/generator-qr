const containerQR = document.getElementById('containerQR');
const form = document.getElementById('form');
const btnDownload = document.getElementById('btnDownload');
const inputLink = document.getElementById('link');

// Verificar si la librería QRCode está cargada
if (typeof QRCode === 'undefined') {
  console.error('La librería QRCode no está cargada correctamente.');
} else {
  const QR = new QRCode(containerQR);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const linkValue = inputLink.value; // Elimina espacios en blanco

    if (!linkValue) {
      alert('Por favor, ingresa un enlace válido.');
      return; // Detener la ejecución si el input está vacío
    }

    // Generar el código QR
    QR.makeCode(linkValue);

    // Mostrar el botón de descarga después de generar el código QR
    btnDownload.style.display = 'block';
  });

  btnDownload.addEventListener('click', () => {
    const canvas = containerQR.querySelector('canvas');
    if (canvas) {
      try {
        // Convertir el canvas en una imagen PNG
        const image = canvas.toDataURL('image/png');

        // Crear un enlace temporal para descargar la imagen
        const link = document.createElement('a');
        link.href = image;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al descargar la imagen:', error);
        alert('Ocurrió un error al descargar la imagen. Por favor, intenta nuevamente.');
      }
    } else {
      alert('No se ha generado ningún código QR aún.');
    }
  });
}
