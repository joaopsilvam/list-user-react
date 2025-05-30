// src/services/apiService.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

const BASE_URL = 'https://68365078664e72d28e406dd1.mockapi.io/api/v1/users';

const ApiService = {
  getUsers: async (): Promise<User[]> => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Erro ao buscar usuários');
    return await res.json();
  },

  getUser: async (id: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar o usuário');
    return await res.json();
  },

  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Erro ao criar usuário');
    return await res.json();
  },

  updateUser: async (id: string, user: Omit<User, 'id'>): Promise<User> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Erro ao atualizar usuário');
    return await res.json();
  },

  deleteUser: async (id: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Erro ao deletar usuário');
    return await res.json();
  },

  login: async (email: string, password: string): Promise<string> => {
    const res = await fetch(`https://68365078664e72d28e406dd1.mockapi.io/api/v1/auth?email=${email}&password=${password}`);

    if (!res.ok) {
      throw new Error('Erro ao fazer login');
    }
    console.log('res', res);
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return data[0].token;
    } else {
      throw new Error('Credenciais inválidas');
    }
  },

};

export default ApiService;
