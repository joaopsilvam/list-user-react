import React, { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserFormPage.css';
import ApiService from '../services/ApiService';
import Sidebar from '../components/Sidebar';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

const UserFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit && id) {
      ApiService.getUser(id).then((data: UserFormData) => {
        setForm({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          avatar: data.avatar,
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && id) {
        await ApiService.updateUser(id, form);
        alert('Usuário atualizado com sucesso!');
      } else {
        await ApiService.createUser(form);
        alert('Usuário criado com sucesso!');
      }
      navigate('/home');
    } catch (err) {
      alert('Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="form-page-content">
        <div className="form-card">
          <h2>{isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-avatar">
              <img
                src={form.avatar || 'https://i.pinimg.com/originals/9e/f3/74/9ef3740ed8116c5a67d68ad51ed48652.png'}
                alt="avatar"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://i.pinimg.com/originals/9e/f3/74/9ef3740ed8116c5a67d68ad51ed48652.png';
                }}
              />
            </div>

            <input
              type="text"
              name="avatar"
              placeholder="URL do Avatar"
              value={form.avatar}
              onChange={handleChange}
            />

            <input
              type="text"
              name="firstName"
              placeholder="Primeiro nome"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Sobrenome"
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserFormPage;
