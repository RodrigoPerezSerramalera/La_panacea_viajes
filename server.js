const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '0712',
  port: 5432,
});

// Ruta para el formulario de contacto
app.post('/contacto', async (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  try {
    await pool.query(
      'INSERT INTO contacto (nombre, email, telefono, mensaje) VALUES ($1, $2, $3, $4)',
      [nombre, email, telefono, mensaje]
    );
    res.send(`
      <h2>✅ ¡Gracias por tu mensaje!</h2>
      <p>Nos contactaremos pronto.</p>
      <a href="/">Volver al inicio</a>
    `);
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    res.status(500).send('❌ Ocurrió un error al enviar tu mensaje.');
  }
});

// Rutas para tus otras páginas
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

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
