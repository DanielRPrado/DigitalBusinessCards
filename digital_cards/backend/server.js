const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

// Configurar las variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app = express();

// Permitir CORS
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas
app.use('/api/users', userRoutes);

// Sirve los archivos estáticos de la aplicación React
app.use(express.static(path.join(__dirname, '../build')));

// Ruta para manejar todas las demás solicitudes y devolver el index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
