# 🚀 OS API

[![Node.js](https://img.shields.io/badge/node-%3E%3D12.0.0-green?style=flat-square)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](LICENSE)
[![Sequelize](https://img.shields.io/badge/ORM-Sequelize-52b0e7?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![Express](https://img.shields.io/badge/Framework-Express-000?style=flat-square&logo=express)](https://expressjs.com/)

---

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/Made%20with-Node.js-339933?style=flat-square&logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Code%20Style-Airbnb-ff5a5f?style=flat-square&logo=airbnb" alt="Airbnb Style"/>
</p>

---

## 📑 Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Principais Tecnologias](#principais-tecnologias)
- [Padrões de Projeto](#padrões-de-projeto)
- [Setup e Instalação](#setup-e-instalação)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Comandos Úteis](#comandos-úteis)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Rotas Principais](#rotas-principais)
- [Autor](#-autor)
- [Contribuição](#-contribuição)

---

## 💡 Sobre o Projeto
API robusta para gestão de serviços, usuários, empresas, oficinas e soluções, com autenticação JWT, filas assíncronas, envio de e-mails e upload de arquivos. Ideal para sistemas de gestão e automação de processos.

---

## 🛠️ Principais Tecnologias
- **Node.js**
- **Express**
- **Sequelize** (PostgreSQL)
- **JWT** para autenticação
- **Multer** para upload de arquivos
- **Nodemailer** + **Handlebars** para e-mails
- **Bee-Queue** + **Redis** para filas
- **Yup** para validação
- **dotenv** para variáveis de ambiente
- **date-fns** e **moment** para datas
- **ESLint** + **Prettier** (padronização de código)

---

## 🏛️ Padrões de Projeto
- **MVC** (Model-View-Controller)
- **Service Layer** (lógica de negócio separada)
- **Fila de Jobs** (Bee-Queue)
- **Validação com Yup**
- **Middlewares Express**

---

## ⚙️ Setup e Instalação
```bash
# 1. Clone o repositório
git clone https://github.com/Salamandery/-meetapp_api.git
cd ProjectOS_api

# 2. Instale as dependências
npm install

# 3. Configure o arquivo .env (veja abaixo)

# 4. Execute as migrations e seeds
npx sequelize db:migrate
yarn sequelize db:seed:all # ou npm run equivalente

# 5. Inicie o servidor e a fila
npm run dev         # Inicia a API
npm run dev-queue   # Inicia o worker de filas
```

---

## 📝 Configuração de Ambiente
Crie um arquivo `.env` na raiz do projeto com as variáveis:
```env
SERVERIP=127.0.0.1
FILEPATH=/files
PORTA=3333

DIALECT=postgres
HOST=localhost
DBUSER=usuario
DBPASS=senha
DBSCHEMA=database

SECRET=segredoJWT
EXPIRESIN=7d

MAILHOST=smtp.mailtrap.io
MAILPORT=2525
MAILUSER=usuario
MAILPASS=senha
MAILFROM="Nome <email@dominio.com>"

REDISHOST=127.0.0.1
REDISPORT=6379
```

---

## 🏃‍♂️ Comandos Úteis
- `npm run dev` — Inicia o servidor em modo desenvolvimento
- `npm run dev-queue` — Inicia o worker de filas
- `npx sequelize db:migrate` — Executa as migrations
- `npx sequelize db:seed:all` — Popula o banco com dados iniciais

---

## ✨ Principais Funcionalidades
- 🔒 Autenticação JWT
- 📁 Upload de arquivos (Multer)
- 📧 Envio de e-mails (Nodemailer + Handlebars)
- 🐝 Filas assíncronas (Bee-Queue + Redis)
- ✅ Validação de dados (Yup)
- 🏗️ API RESTful estruturada em MVC

---

## 🗄️ Estrutura do Banco de Dados (Exemplo)
```sql
Users (
  id INT PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password_hash VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
Files (
  id INT PRIMARY KEY,
  name VARCHAR,
  path VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

## 🌐 Rotas Principais
- `POST   /session` — Login
- `POST   /users` — Cadastro de usuário
- `GET    /users` — Listagem de usuários (autenticado)
- Outras rotas para serviços, empresas, oficinas, setores, soluções, arquivos, etc.

---

## 👤 Autor
by **Rodolfo M. F. Abreu**

---

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar PRs ou sugerir melhorias.

<p align="center">
  <b>⭐️ Dê uma estrela se gostou do projeto!</b>
</p>
