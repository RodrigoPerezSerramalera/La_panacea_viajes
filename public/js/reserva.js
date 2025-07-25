document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    var idViaje = window.location.search.split('id=')[1] ? parseInt(window.location.search.split('id=')[1]) : null;

    getViaje(idViaje);

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita que se recargue la página

      // Obtener valores del formulario
      const nombre = document.getElementById('nombre').value.trim();
      const cantidad = document.getElementById('cantidad').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const email = document.getElementById('email').value.trim();
      const fecha_salida = document.getElementById('fecha-salida').value.trim();
      const fecha_regreso = document.getElementById('fecha-regreso').value.trim();
      const id_viaje = window.location.search.split('id=')[1] ? parseInt(window.location.search.split('id=')[1]) : null;

      // Validación básica
      if (nombre === '' || cantidad === '' || telefono === '' || email === '' || fecha_salida === '' || fecha_regreso === '') {
        alert('⚠️ Por favor, completá todos los campos.');
        return;
      }

      // Crear objeto con los datos
      const datosReserva = {
        nombre,
        cantidad: parseInt(cantidad),
        telefono,
        email,
        fecha_salida,
        fecha_regreso,
        id_viaje
      };

      postReserva(datosReserva);
    });
  });

  function getViaje(idViaje)
  {
    fetch('/api/viajes/' + idViaje, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) throw new Error(`Error el viaje ${idViaje}`);
      return response.json();
    })
    .then(data => {
        const fecha_salida = document.getElementById('fecha-salida');
        const fecha_regreso = document.getElementById('fecha-regreso');

        fecha_salida.value = toStringDateYYYYMMDD(data.fecha_salida);
        fecha_regreso.value = toStringDateYYYYMMDD(data.fecha_vuelta);

        fecha_regreso.disabled = true;
        fecha_salida.disabled = true;
    })
    .catch(error => {
      console.error('❌ Error el viaje:', error);
    });
  }

  function postReserva(datosReserva){
    fetch('/api/reserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosReserva)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error al enviar la reserva');
      return response.json();
    })
    .then(data => {
      alert('✅ ¡Reserva enviada con éxito!');
      window.location.href = 'viajes.html';
    })
    .catch(error => {
      console.error('❌ Error al enviar:', error);
      alert('❌ Ocurrió un error al enviar la reserva.');
    });
  }