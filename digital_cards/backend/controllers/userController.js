const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por email en la base de datos
        const user = await User.findOne({ email });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta utilizando bcrypt
        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT válido por 1 hora
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respuesta con el token y los datos del usuario
        res.json({ token, user });

    } catch (error) {
        // Manejar errores
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
}