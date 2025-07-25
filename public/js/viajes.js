document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/viajes.json')
    .then(response => response.json())
    .then(data => mostrarViajes(data))
    .catch(error => console.error('Error al cargar los viajes:', error));
});

function mostrarViajes(viajes) {
  const container = document.getElementById('viajes-container');
  viajes.forEach((viaje, index) => {
    const card = document.createElement('div');
    card.className = 'viaje-card';

    card.innerHTML = `
      <img src="${viaje.imagen}" alt="${viaje.destino}" class="viaje-img">
      <h3>${viaje.destino}</h3>
      <p>${viaje.descripcion}</p>
      <span class="precio">${viaje.precio}</span>
      <button class="ver-mas-btn" data-index="${index}">Ver más</button>
    `;

    container.appendChild(card);
  });

  // Listeners para los botones Ver más
  document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      mostrarModal(viajes[index]);
    });
  });
}

function mostrarModal(viaje) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';

  const fotosCarrusel = viaje.fotos.map((foto, i) => `
    <div class="carousel-slide${i === 0 ? ' active' : ''}">
      <img src="${foto}" class="carousel-img" alt="foto viaje">
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content glass">
      <span class="close-modal">&times;</span>
      <h2>${viaje.destino}</h2>
      <p><strong>Salida:</strong> ${viaje.fecha_salida} | <strong>Regreso:</strong> ${viaje.fecha_vuelta}</p>

      <p><strong>Incluye:</strong></p>
      <ul>${viaje.incluye.map(item => `<li>${item}</li>`).join('')}</ul>

      <p><strong>Itinerario:</strong></p>
      <ul>${viaje.itinerario.map(dia => `<li>${dia}</li>`).join('')}</ul>

      <div class="carousel">
        ${fotosCarrusel}
        <button class="carousel-btn prev">&lt;</button>
        <button class="carousel-btn next">&gt;</button>
      </div>

      <button class="btn-reservar">Reservar</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Lógica del carrusel
  let currentSlide = 0;
  const slides = modal.querySelectorAll('.carousel-slide');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  modal.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  modal.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Cerrar modal
  modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());

  // Reservar
  modal.querySelector('.btn-reservar').addEventListener('click', () => {
    alert(`Gracias por tu interés en ${viaje.destino}. Pronto te contactaremos.`);
    modal.remove();
  });
}


