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

// 📩 Ruta POST para guardar datos del formulario de contacto
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
