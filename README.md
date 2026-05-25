# Sistema de Gerenciamento de Produtos

Aplicação full-stack para gerenciamento de produtos com backend em Node.js/Express e frontend em React.

## 📋 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem de dados
- **Persistência em Memória** - Armazenamento simples (sem banco de dados)

### Frontend
- **React** - Biblioteca UI
- **TypeScript** - Tipagem de dados
- **Axios** - Cliente HTTP
- **CSS Puro** - Estilos responsivos

## 🚀 Como Instalar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Backend

```bash
# Navegue até a pasta do backend
cd backend

# Instale as dependências
npm install
```

### Frontend

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Crie o arquivo .env
cp .env.example .env
```

## ▶️ Como Rodar o Projeto

### Rodando o Backend

```bash
cd backend

# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção (compilado)
npm run build
npm start
```

O backend iniciará na porta `3001` por padrão.

### Rodando o Frontend

```bash
cd frontend

# Modo desenvolvimento
npm start

# Modo produção (build otimizado)
npm run build
```

O frontend abrirá automaticamente em `http://localhost:3000`.

## 🌐 Como Acessar a Aplicação

Após iniciar tanto o backend quanto o frontend:

1. **Frontend**: Acesse [http://localhost:3000](http://localhost:3000)
2. **API**: [http://localhost:3001](http://localhost:3001)
3. **Health Check**: [http://localhost:3001/health](http://localhost:3001/health)

## 📡 Rotas da API

### GET /produtos
Lista todos os produtos cadastrados.

**Exemplo de resposta:**
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
  "total": 1
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

## 📝 Observações

### Decisões Técnicas

1. **Persistência em Memória**
   - Os dados são armazenados em um array em memória
   - Ideais para demonstração de conceitos
   - Dados são perdidos ao reiniciar a aplicação
   - Para produção, seria necessário implementar um banco de dados real

2. **Estrutura Backend**
   - Separação em camadas: Controllers, Services e Models
   - Validação de entrada centralizada
   - Tratamento de erros padronizado
   - Respostas HTTP consistentes

3. **Interface Frontend**
   - Componentes reutilizáveis (FormularioProduto e ListaProdutos)
   - Estado gerenciado com hooks do React
   - Feedback visual para o usuário (mensagens de sucesso/erro)
   - Design responsivo para mobile e desktop

4. **TypeScript**
   - Tipos definidos para maior segurança
   - Melhor autocomplete no IDE
   - Documentação através de tipos

### Uso de Docker

Não foi implementado Docker neste projeto, mas poderia ser adicionado facilmente:
- Dockerfile para o backend
- Dockerfile para o frontend
- docker-compose.yml para orquestração
- Seria um diferencial caso fosse necessário

## 🔧 Extensões Futuras

Para evolucir o projeto:

1. **Banco de Dados Real**
   - Implementar PostgreSQL ou MongoDB
   - Criar migrations para estrutura de dados

2. **Autenticação**
   - JWT para segurança
   - Controle de acesso por usuário

3. **Validações Avançadas**
   - Biblioteca como `joi` ou `zod`
   - Validação em tempo real no frontend

4. **Testes**
   - Testes unitários com Jest
   - Testes de integração
   - Testes E2E com Cypress

5. **Melhorias na Interface**
   - Paginação na listagem
   - Filtros e busca
   - Exportação de dados (CSV, PDF)
   - Dashboard com estatísticas

## 📞 Contato

Para dúvidas sobre o projeto, entre em contato.

---

**Desenvolvido em 2024** - Desafio Técnico Full Stack Júnior
