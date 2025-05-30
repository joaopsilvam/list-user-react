import React from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <img
        src="https://i.pinimg.com/originals/9e/f3/74/9ef3740ed8116c5a67d68ad51ed48652.png"
        alt="User Avatar"
        className="profile-pic"
      />
      <div className="username">João Pedro</div>
      <div className="email">joao@email.com</div>

      <nav>
        <ul>
          <li className="active" onClick={() => navigate('/home')}>Usuários</li>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
