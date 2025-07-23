const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware para permitir acceso desde cualquier origen
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Puedes agregar más rutas según lo necesites
app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact-us.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/paquetes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'paquetes.html'));
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
