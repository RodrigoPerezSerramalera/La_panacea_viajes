document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/viajes.json')
    .then(response => response.json())
    .then(data => mostrarViajes(data))
    .catch(error => console.error('Error al cargar los viajes:', error));
});

function mostrarViajes(viajes) {
  const container = document.getElementById('viajes-container');
  viajes.forEach(viaje => {
    const card = document.createElement('div');
    card.className = 'viaje-card';

    card.innerHTML = `
      <img src="${viaje.imagen}" alt="${viaje.destino}" class="viaje-img">
      <h3>${viaje.destino}</h3>
      <p>${viaje.descripcion}</p>
      <span class="precio">${viaje.precio}</span>
    `;

    container.appendChild(card);
  });
}
