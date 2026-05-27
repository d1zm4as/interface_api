# 📦 Sistema de Gerenciamento de Produtos

Aplicação full-stack moderna para gerenciamento de produtos com backend em Node.js/Express e frontend em React com shadcn/ui.

## 📋 Tecnologias Utilizadas

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express.js 4.18** - Framework web
- **TypeScript 5.0** - Tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Prisma ORM** - Camada de acesso ao banco
- **Jest** - Framework de testes
- **Zod** - Schema validation
- **Docker** - Containerização

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript 4.9** - Tipagem estática
- **Tailwind CSS 3.3** - Utility-first CSS
- **shadcn/ui** - Componentes acessíveis
- **Axios 1.4** - Cliente HTTP
- **Lucide React** - Ícones SVG
- **Docker** - Containerização

## ⚡ Quick Start

### Opção 1: Setup Automático (Recomendado)

```bash
# Execute o script de setup
chmod +x setup.sh
./setup.sh

# Após o setup, em dois terminais:

# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm start
```

### Opção 2: Docker Compose

```bash
docker-compose up --build -d
```

Frontend: http://localhost:3000
Backend: http://localhost:3001
Banco: PostgreSQL na porta 5432

### Opção 3: Manual

**Backend:**
```bash
cd backend
npm install
npm run build
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 🚀 Instalação Detalhada

### Pré-requisitos
- Node.js 18+ ([instalar](https://nodejs.org/))
- PostgreSQL 16+ ou Docker
- Docker (opcional, para containerização)

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar o ambiente
cp .env.example .env

# Gerar o Prisma Client
npm run prisma:generate

# Aplicar as migrações
npm run prisma:deploy

# Compilar TypeScript
npm run build

# Iniciar em desenvolvimento
npm run dev

# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage
```

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Iniciar em desenvolvimento
npm start

# Build para produção
npm run build
```

## 🌐 Acesso à Aplicação

Após iniciar:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Frontend | http://localhost:3000 | Interface web |
| API Backend | http://localhost:3001 | Servidor API |
| Health Check | http://localhost:3001/health | Status do backend |
| Produtos | http://localhost:3001/produtos | Endpoint principal de produtos |
| Produtos (alias) | http://localhost:3001/products | Alias em inglês para o mesmo endpoint |
| PostgreSQL | localhost:5432 | Banco de dados |

## 📡 API Endpoints

### GET /produtos
Lista produtos com filtros opcionais e paginação quando `pagina` ou `porPagina` são informados.

> O mesmo conjunto de rotas também está disponível em `/products` para aderir ao enunciado do desafio.

**Query Parameters:**
- `pagina` (default: 1)
- `porPagina` (default: 10, máximo: 100)
- `busca` - Buscar por nome/descrição
- `categoria` - Filtrar por categoria
- `precoMin` - Preço mínimo
- `precoMax` - Preço máximo
- `ativo` - Filtrar por status
- `pagina` e `porPagina` - Ativam a paginação e retornam metadados em `paginacao`
- `sortBy` - Campo de ordenação (`name`, `price`, `category`, `active`, `createdAt`, `updatedAt`)
- `sortDirection` - Direção da ordenação (`asc` ou `desc`)

**Exemplo:**
```bash
GET /produtos?pagina=1&busca=notebook&categoria=Eletrônicos
```

**Resposta:**
```json
{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "name": "Notebook",
      "description": "Notebook Intel Core i7",
      "price": 2500.00,
      "category": "Eletrônicos",
      "active": true,
      "createdAt": "2024-05-25T10:30:00.000Z"
    }
  ],
  "total": 1,
  "paginacao": null,
  "filtrosAplicados": {}
}
```

### GET /produtos/:id
Obtém um produto específico pelo ID.

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "name": "Notebook",
    "description": "Notebook Intel Core i7",
    "price": 2500.00,
    "category": "Eletrônicos",
    "active": true,
    "createdAt": "2024-05-25T10:30:00.000Z"
  }
}
```

### POST /produtos
Cria um novo produto.

**Corpo da requisição:**
```json
{
  "name": "Monitor",
  "description": "Monitor 27 polegadas Full HD",
  "price": 800.00,
  "category": "Periféricos",
  "active": true
}
```

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Produto criado com sucesso",
  "dados": {
    "id": 2,
    "name": "Monitor",
    "description": "Monitor 27 polegadas Full HD",
    "price": 800.00,
    "category": "Periféricos",
    "active": true,
    "createdAt": "2024-05-25T10:35:00.000Z"
  }
}
```

### PUT /produtos/:id
Atualiza um produto existente.

**Corpo da requisição (todos os campos são opcionais):**
```json
{
  "name": "Monitor 32 polegadas",
  "price": 1200.00
}
```

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Produto atualizado com sucesso",
  "dados": {
    "id": 2,
    "name": "Monitor 32 polegadas",
    "description": "Monitor 27 polegadas Full HD",
    "price": 1200.00,
    "category": "Periféricos",
    "active": true,
    "createdAt": "2024-05-25T10:35:00.000Z"
  }
}
```

### DELETE /produtos/:id
Remove um produto.

**Exemplo de resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Produto removido com sucesso"
}
```

## 🧪 Testes

### Executar Testes

```bash
# Backend
cd backend
npm test              # Todos os testes
npm run test:watch   # Modo watch
npm run test:coverage # Com relatório de cobertura
```

### Cobertura

Testes incluem:
- ✅ ValidacaoService - Validação de dados
- ✅ RepositorioProdutos - Operações CRUD
- ✅ Paginação - Cálculos de páginas
- ✅ Busca e Filtros - Busca de produtos

Ver [docs/TESTES.md](docs/TESTES.md) para documentação completa.

## 🐳 Docker

### Quick Start com Docker Compose

```bash
docker-compose up
```

Isso inicia:
- Backend na porta 3001
- Frontend na porta 3000

### Build Individual

```bash
# Backend
docker build -t produtos-api ./backend
docker run -p 3001:3001 produtos-api

# Frontend
docker build -t produtos-web ./frontend
docker run -p 3000:3000 produtos-web
```

Ver [docs/DEPLOY.md](docs/DEPLOY.md) para guia completo de deployment.

## 🔍 Funcionalidades

### ✨ Backend Features
- ✅ CRUD completo de produtos
- ✅ Validação com Zod
- ✅ Paginação
- ✅ Busca e filtros avançados
- ✅ Health checks
- ✅ CORS configurável
- ✅ Testes automatizados
- ✅ Containerização Docker

### ✨ Frontend Features
- ✅ Interface moderna com shadcn/ui
- ✅ Responsive design (mobile + desktop)
- ✅ Formulário CRUD com validação
- ✅ Listagem com tabela
- ✅ Modal de confirmação
- ✅ Busca e filtros
- ✅ Paginação
- ✅ Feedback visual (loaders, mensagens)
- ✅ Componentes acessíveis

## 📚 Documentação

- [INSTRUÇÕES_DESENVOLVIMENTO.md](docs/INSTRUÇÕES_DESENVOLVIMENTO.md) - Guia de desenvolvimento
- [TESTES.md](docs/TESTES.md) - Guia de testes
- [DEPLOY.md](docs/DEPLOY.md) - Deploy e containerização
- [SETUP_AUTOMATICO.md](docs/SETUP_AUTOMATICO.md) - Script de setup
- [ARQUITETURA.md](docs/ARQUITETURA.md) - Arquitetura do projeto
- [COMMITS.md](docs/COMMITS.md) - Histórico de commits
- [CHECKLIST.md](docs/CHECKLIST.md) - Checklist de desenvolvimento

## 📝 Estrutura do Projeto

```
interface_api/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controllers HTTP
│   │   ├── services/         # Lógica de negócio
│   │   ├── models/           # Tipos TypeScript
│   │   ├── middlewares/      # Middlewares Express
│   │   ├── routes/           # Rotas
│   │   ├── __tests__/        # Testes
│   │   └── index.ts          # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── services/         # Serviços HTTP
│   │   ├── types/            # Tipos TypeScript
│   │   ├── hooks/            # Custom hooks
│   │   ├── constants/        # Constantes
│   │   ├── utils/            # Utilitários
│   │   ├── lib/              # Bibliotecas
│   │   ├── App.tsx           # Componente root
│   │   └── index.tsx         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docs/                    # Documentação completa
├── docker-compose.yml       # Orquestração Docker
├── setup.sh                 # Script de setup automático
└── README.md               # Este arquivo
```

## 🎯 Arquitetura

### Backend - Padrão MVC

```
Request → Router → Controller → Service → Repository → Database
          ↑                                                ↓
          ←───────── Response ←────────────────────────────
```

### Frontend - Componentes + Hooks

```
App
├── Header
├── FormularioProdutoShadcn
│   └── shadcn/ui Components
├── ListaProdutosShadcn
│   └── shadcn/ui Components
└── Footer
```

## 🚀 CI/CD

GitHub Actions automatiza:
- ✅ Testes em múltiplas versões Node.js
- ✅ Type checking TypeScript
- ✅ Build de produção
- ✅ Docker image build
- ✅ Análise de segurança
- ✅ Code quality scans

Ver `.github/workflows/ci-cd.yml`

## 🛠 Desenvolvimento

### Adicionando uma nova feature

1. Criar branch: `git checkout -b feature/nome-feature`
2. Implementar testes primeiro (TDD)
3. Implementar feature
4. Atualizar documentação
5. Fazer commit: `git commit -m "feat: descrição"`
6. Push e criar PR

### Padrões de código

- TypeScript strict mode
- ESLint rules (se configurado)
- Testes obrigatórios para features
- Documentação em português

## ⚙️ Variáveis de Ambiente

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
```

## 🆘 Troubleshooting

**Porta 3000/3001 já em uso:**
```bash
# Linux/Mac
lsof -i :3001
kill -9 <PID>

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Erro ao instalar dependências:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Frontend não conecta ao backend:**
- Verificar `REACT_APP_API_URL` no .env
- Verificar CORS no backend
- Backend está rodando?
- Verificar porta

Ver [docs/DEPLOY.md](docs/DEPLOY.md#troubleshooting) para mais troubleshooting.

## 📊 Performance

- Frontend: ~50KB gzipped
- Backend: ~200KB
- Time to interactive: < 2s
- API response: < 100ms

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido como projeto de full-stack com tecnologias modernas.

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes React
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Express.js](https://expressjs.com/) - Backend framework
- [React](https://react.dev/) - Frontend library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---


**Desenvolvido em 2026** - Desafio Técnico Full Stack Júnior
