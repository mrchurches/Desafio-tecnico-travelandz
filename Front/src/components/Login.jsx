import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({isLoggedIn, setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si mostrar u ocultar la contraseña
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword); // Cambiar el estado de mostrar/ocultar contraseña
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
            // Si el inicio de sesión fue exitoso, redirige al usuario a la página de inicio
            //con useNavigate deberia redireccionar a home y guardar en cookies la info del user
            localStorage.setItem('accessToken', data.user.stsTokenManager.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsLoggedIn(true);
            navigate('/home');
            } else {
            // Si el inicio de sesión falló, muestra un mensaje de error
            console.log('Login failed:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        
    })
  };

  return (
    <div className='flex flex-col items-center gap-y-4 justify-center h-full'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-y-4'>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} />
          {/* Botón para mostrar/ocultar la contraseña */}
          <button type="button" onClick={handleToggleShowPassword}>
            {showPassword ? "Ocultar" : "Mostrar"} contraseña
          </button>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
