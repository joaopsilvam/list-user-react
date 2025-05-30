import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('Keanu_Rice@gmail.com');
  const [password, setPassword] = useState('GIlyy99LOFFgR7K');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await ApiService.login(email, password);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Entrar</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            value={password}
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="login-btn" onClick={handleLogin}>Entrar</button>
      </div>
    </div>

  );
};

export default LoginPage;
