# 🌐 User Management App - React

Este é um aplicativo React com TypeScript para gerenciamento de usuários, que consome uma API REST mockada para realizar operações de CRUD. Interface moderna e responsiva com sidebar fixa e filtros em tempo real.

## 🚀 Funcionalidades

- Login simulado com redirecionamento
- Listagem de usuários com design em cards
- Filtro por nome, sobrenome e e-mail
- Cadastro e edição de usuários
- Remoção de usuários
- Sidebar com avatar, dados e menu

## 🔗 API Utilizada

Mock API usada:
```
https://68365078664e72d28e406dd1.mockapi.io/api/v1/users
```

## 🧱 Estrutura do Projeto

```bash
src/
├── pages/             # LoginPage, HomePage, UserFormPage
├── services/          # ApiService.ts
├── components/        # Componentes reutilizáveis (ex: Sidebar)
├── App.tsx            # Definições de rotas
└── main.tsx           # Entry point da aplicação
```

## 🛠 Tecnologias

- React
- TypeScript
- React Router
- CSS Modules

## ▶️ Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/user-list-react.git
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o projeto:
```bash
npm run dev
```

## 📄 Licença

Este projeto está sob a licença MIT.
