import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Image from '../assets/Login-img.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/cardeditor'); // Redirige a la página del editor de tarjetas después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar el error adecuadamente
    }
  };

  return (
    <body className="login">
      <main className="login-form">
        
        <form onSubmit={handleSubmit} className="form">
          <div>
            <h2 className="title">Iniciar sesión</h2>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
          <button onClick={() => navigate('/register')}>Registrarse</button>
        </form>
        <section className='image'>
          <img src={Image} alt="Login" />
        </section>
        <section className='background'></section>
      </main>
    </body>
  );
};

export default Login;
