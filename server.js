const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'panacea',
  password: '0712',
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contacto', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  try {
    await pool.query(
      'INSERT INTO contacto (nombre, email, telefono, mensaje) VALUES ($1, $2, $3, $4)',
      [nombre, email, telefono, mensaje]
    );
    res.status(200).json({ mensaje: 'Mensaje recibido y guardado correctamente.' });
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    res.status(500).json({ error: 'Error al guardar el mensaje.' });
  }
});

app.post('/api/reserva', async (req, res) => {
  const { nombre, cantidad, telefono, email, fecha_salida, fecha_regreso, id_viaje } = req.body;

  try {
    await pool.query(
      'INSERT INTO reservas (nombre, cantidad, telefono, email, fecha_salida, fecha_regreso, id_viaje) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [nombre, cantidad, telefono, email, fecha_salida, fecha_regreso, id_viaje]
    );
    res.status(200).json({ mensaje: 'Reserva recibida y guardada correctamente.' });
  } catch (err) {
    console.error('Error al insertar en la base de datos:', err);
    res.status(500).json({ error: 'Error al guardar la reserva.' });
  }
});

app.get('/api/viajes', async (req, res) => {
  try {
    // Consulta SQL para obtener los viajes y sus detalles
    const viajesQuery = `
      SELECT v.id_viaje, v.destino, v.descripcion, v.precio, v.imagen, v.fecha_salida, v.fecha_vuelta, 
             array_agg(DISTINCT i.descripcion) AS incluye,
             array_agg(DISTINCT t.descripcion) AS itinerario,
             array_agg(DISTINCT f.url) AS fotos
      FROM viajes v
      LEFT JOIN incluye i ON v.id_viaje = i.id_viaje
      LEFT JOIN itinerario t ON v.id_viaje = t.id_viaje
      LEFT JOIN fotos f ON v.id_viaje = f.id_viaje
      GROUP BY v.id_viaje
    `;
    
    // Ejecutar la consulta en la base de datos
    const result = await pool.query(viajesQuery);

    // Enviar los resultados como respuesta en formato JSON
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener los viajes:', err);
    res.status(500).json({ error: 'Hubo un error al obtener los viajes.' });
  }
});

app.get('/api/viajes/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Consulta SQL para obtener los viajes y sus detalles
    const viajesQuery = `
      SELECT v.id_viaje, v.destino, v.descripcion, v.precio, v.imagen, v.fecha_salida, v.fecha_vuelta, 
             array_agg(DISTINCT i.descripcion) AS incluye,
             array_agg(DISTINCT t.descripcion) AS itinerario,
             array_agg(DISTINCT f.url) AS fotos
      FROM viajes v
      LEFT JOIN incluye i ON v.id_viaje = i.id_viaje
      LEFT JOIN itinerario t ON v.id_viaje = t.id_viaje
      LEFT JOIN fotos f ON v.id_viaje = f.id_viaje
      WHERE v.id_viaje = $1
      GROUP BY v.id_viaje
    `;
    
    // Ejecutar la consulta en la base de datos
    const result = await pool.query(viajesQuery, [id]);

    if(result .rows.length === 0) {
      return res.status(404).json({ error: 'Viaje no encontrado.' });
    }

    // Enviar los resultados como respuesta en formato JSON
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener los viajes:', err);
    res.status(500).json({ error: 'Hubo un error al obtener los viajes.' });
  }
});

// 🌐 Rutas de páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
app.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacto.html'));
});
app.get('/viajes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'viajes.html'));
});
app.get('/nosotros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nosotros.html'));
});

// 🚀 Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
