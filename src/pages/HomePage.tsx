import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './HomePage.css';
import ApiService from '../services/ApiService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await ApiService.getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const filtered = users
    .filter(user =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === 'name'
        ? a.firstName.localeCompare(b.firstName)
        : a.id.localeCompare(b.id)
    );

  return (
    <div className="home-layout">
      <Sidebar />
      <div className="home-main">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="name">Ordenar por Nome</option>
            <option value="id">Ordenar por ID</option>
          </select>
          <button className="add-btn" onClick={() => navigate('/form')}>+ Novo</button>
        </div>

        <div className="user-grid">
          {filtered.map(user => (
            <div className="user-card" key={user.id}>
              <img
                src={user.avatar}
                alt={user.firstName}
                onError={e => ((e.target as HTMLImageElement).src = 'https://via.placeholder.com/80')}
              />
              <div className="user-info">
                <h4>{user.firstName} {user.lastName}</h4>
                <p>{user.email}</p>
                <button className="view-btn" onClick={() => navigate(`/form/${user.id}`)}>
                  Ver mais
                </button>
                <button
                  className="delete-btn"
                  onClick={async () => {
                    try {
                      await ApiService.deleteUser(user.id);
                      alert('Usuário removido com sucesso!');
                      window.location.reload(); 
                    } catch (err) {
                      alert('Erro ao remover usuário.');
                    }
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
