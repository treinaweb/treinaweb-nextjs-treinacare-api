# 🏥 TreinaCare API

Sou instrutor da TreinaWeb e criei esta API como parte do projeto prático **TreinaCare**, uma aplicação para agendamento médico.

## 📋 Sobre o Projeto

O TreinaCare é uma plataforma de agendamento médico que permite aos usuários:

- 🔐 Autenticação segura com JWT
- 👨‍⚕️ Listar médicos disponíveis
- 📅 Agendar consultas médicas
- 📊 Visualizar histórico de agendamentos
- 👤 Gerenciar perfil do usuário

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React para API Routes
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT (jose)** - Autenticação e autorização
- **bcrypt** - Hash de senhas

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd api-treinacare
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="seu-jwt-secret-super-seguro-aqui"
```

### 4. Configure o banco de dados

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

### 5. Popule o banco de dados (opcional)

Execute o seed para criar dados de exemplo:

```bash
npx tsx seed.tsx
```

### 6. Execute a aplicação

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

## 📚 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/refresh` - Renovar token JWT

### Usuários

- `GET /api/user` - Obter dados do usuário autenticado

### Médicos

- `GET /api/doctors` - Listar todos os médicos
- `GET /api/doctors/[id]` - Obter detalhes de um médico
- `POST /api/doctors/[id]/schedule` - Agendar consulta com médico

### Agendamentos

- `GET /api/appointments` - Listar agendamentos do usuário
  - Query params: `count` (limite), `status` (filtrar por status)

## 🔒 Autenticação

A API utiliza JWT para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

### Endpoints protegidos:
- `/api/appointments/*`
- `/api/doctors/*/schedule`
- `/api/user`

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza Prisma com SQLite e possui as seguintes entidades principais:

- **User** - Usuários do sistema
- **Doctor** - Médicos disponíveis
- **Appointment** - Agendamentos de consultas

Para visualizar o banco de dados:

```bash
npx prisma studio
```

## 📁 Estrutura do Projeto

```
api-treinacare/
├── app/
│   ├── api/           # API Routes
│   │   ├── auth/      # Autenticação
│   │   ├── doctors/   # Médicos
│   │   ├── appointments/ # Agendamentos
│   │   └── user/      # Usuário
│   └── lib/
│       └── jwt.ts     # Utilitários JWT
├── prisma/
│   ├── schema.prisma  # Schema do banco
│   └── migrations/    # Migrações
├── middleware.ts      # Middleware de autenticação
└── seed.tsx          # Seed do banco de dados
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Executa versão de produção
- `npm run lint` - Executa linter

## 📖 Comandos Úteis do Prisma

```bash
# Gerar o cliente Prisma
npx prisma generate

# Visualizar banco de dados
npx prisma studio

# Reset do banco de dados
npx prisma migrate reset

# Aplicar mudanças no schema
npx prisma db push
```

## 🎯 Próximos Passos

Este projeto serve como base para expandir funcionalidades como:

- Implementação de hash de senhas com bcrypt
- Notificações por email
- Upload de imagens
- Paginação avançada
- Testes automatizados
- Deploy em produção

## 💡 Dicas para Estudos

Durante o desenvolvimento desta API, exploramos conceitos importantes como:

- Middleware personalizado no Next.js
- Validação e tratamento de erros
- Relacionamentos no Prisma
- Segurança com JWT
- TypeScript em APIs
---
