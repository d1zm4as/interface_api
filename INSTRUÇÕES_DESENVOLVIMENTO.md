# 📚 Instruções de Desenvolvimento

Guia completo para entender e trabalhar com o projeto de gerenciamento de produtos.

## 🏗️ Estrutura do Projeto

```
interface_api/
├── backend/                      # Servidor Node.js/Express
│   ├── src/
│   │   ├── models/              # Definições de tipos e interfaces
│   │   │   └── Produto.ts
│   │   ├── controllers/         # Lógica das requisições HTTP
│   │   │   └── ProdutoController.ts
│   │   ├── services/            # Lógica de negócio
│   │   │   ├── ProdutoService.ts (repositório em memória)
│   │   │   └── ValidacaoService.ts
│   │   ├── routes/              # Definição das rotas
│   │   │   └── produtos.ts
│   │   └── index.ts             # Arquivo principal
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
│
├── frontend/                     # Aplicação React
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── FormularioProduto.tsx
│   │   │   ├── FormularioProduto.css
│   │   │   ├── ListaProdutos.tsx
│   │   │   └── ListaProdutos.css
│   │   ├── services/            # Integração com API
│   │   │   └── api.ts
│   │   ├── types/               # Tipos TypeScript
│   │   │   └── Produto.ts
│   │   ├── App.tsx              # Componente principal
│   │   ├── App.css              # Estilos globais
│   │   └── index.tsx            # Entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
├── README.md                     # Documentação principal
├── COMMITS.md                    # Guia de commits
└── INSTRUÇÕES_DESENVOLVIMENTO.md # Este arquivo
```

## 🔄 Fluxo de Dados da Aplicação

### Criação de um Novo Produto

1. **Frontend**: Usuário preenche o formulário em `FormularioProduto`
2. **Frontend**: Clica no botão "Criar Produto"
3. **Frontend**: Componente valida os dados localmente
4. **Frontend**: Chama `criarProduto()` em `services/api.ts`
5. **Backend**: POST request para `http://localhost:3001/produtos`
6. **Backend**: `ProdutoController.criarProduto()` recebe a requisição
7. **Backend**: `ValidacaoService.validarCriacaoProduto()` valida dados
8. **Backend**: `RepositorioProdutos.criar()` armazena o produto
9. **Backend**: Retorna o produto criado com status 201
10. **Frontend**: Mostra mensagem de sucesso
11. **Frontend**: Atualiza a lista chamando `ListaProdutos`

### Listagem de Produtos

1. **Frontend**: Componente `ListaProdutos` monta (useEffect)
2. **Frontend**: Chama `listarProdutos()` em `services/api.ts`
3. **Backend**: GET request para `http://localhost:3001/produtos`
4. **Backend**: `ProdutoController.listarProdutos()` recebe requisição
5. **Backend**: `RepositorioProdutos.listar()` retorna todos os produtos
6. **Backend**: Responde com array de produtos e status 200
7. **Frontend**: Atualiza o estado com os produtos
8. **Frontend**: Renderiza a tabela com os dados

## 🛠️ Desenvolvimento Passo a Passo

### Primeiro: Instale as Dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
cp .env.example .env
```

### Segundo: Inicie o Backend

```bash
cd backend
npm run dev
```

Você verá:
```
🚀 Servidor iniciado na porta 3001
📍 http://localhost:3001
```

### Terceiro: Inicie o Frontend (em outro terminal)

```bash
cd frontend
npm start
```

Isso abrirá automaticamente `http://localhost:3000` no navegador.

## 📂 Como Adicionar uma Nova Funcionalidade

### Exemplo: Adicionar Campo "SKU" ao Produto

#### 1. Backend - Atualizar Modelo

Arquivo: `backend/src/models/Produto.ts`

```typescript
export interface Produto {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  sku: string;  // ← Novo campo
  createdAt: string;
}
```

#### 2. Backend - Atualizar Validação

Arquivo: `backend/src/services/ValidacaoService.ts`

```typescript
export function validarCriacaoProduto(dados: any): ErroValidacao {
  const erros: string[] = [];

  // ... validações existentes ...

  // Novo campo
  if (!dados.sku || typeof dados.sku !== 'string' || dados.sku.trim() === '') {
    erros.push('SKU é obrigatório e deve ser uma string não vazia');
  }

  return { valido: erros.length === 0, erros };
}
```

#### 3. Frontend - Atualizar Tipo

Arquivo: `frontend/src/types/Produto.ts`

```typescript
export interface Produto {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  sku: string;  // ← Novo campo
  createdAt: string;
}
```

#### 4. Frontend - Adicionar Campo ao Formulário

Arquivo: `frontend/src/components/FormularioProduto.tsx`

```typescript
const [formData, setFormData] = useState<CriarProduto>({
  name: '',
  description: '',
  price: 0,
  category: '',
  sku: '',  // ← Novo campo
  active: true,
});

// No JSX do formulário:
<div className="grupo-form">
  <label htmlFor="sku">SKU *</label>
  <input
    type="text"
    id="sku"
    name="sku"
    value={formData.sku}
    onChange={handleMudar}
    required
    placeholder="Ex: PROD-001"
  />
</div>
```

#### 5. Frontend - Adicionar Coluna na Tabela

Arquivo: `frontend/src/components/ListaProdutos.tsx`

```typescript
<th>SKU</th>  // ← Adicionar no header

// Na linha do tbody:
<td>{produto.sku}</td>
```

## 🧪 Testando a API com Curl

### Listar Produtos
```bash
curl http://localhost:3001/produtos
```

### Criar Produto
```bash
curl -X POST http://localhost:3001/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teclado",
    "description": "Teclado mecânico RGB",
    "price": 450.00,
    "category": "Periféricos",
    "active": true
  }'
```

### Obter Produto Específico
```bash
curl http://localhost:3001/produtos/1
```

### Atualizar Produto
```bash
curl -X PUT http://localhost:3001/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 500.00,
    "active": false
  }'
```

### Remover Produto
```bash
curl -X DELETE http://localhost:3001/produtos/1
```

## 🔍 Debugando Problemas

### Backend não conecta
- Verifique se está rodando na porta 3001
- Tente acessar: `http://localhost:3001/health`
- Veja os logs do terminal

### Frontend não consegue conectar na API
- Verifique se `.env` tem a URL correta: `REACT_APP_API_URL=http://localhost:3001`
- Verifique se o backend está rodando
- Abra o DevTools (F12) e veja a aba "Network"

### Produto não aparece na lista
- Verifique o console do navegador (F12)
- Verifique os logs do servidor do backend
- Tente recarregar a página (Ctrl + Shift + R)

## 📝 Variáveis de Ambiente

### Backend
Nenhuma variável de ambiente obrigatória. Opcionais:
- `PORT`: Porta do servidor (padrão: 3001)

### Frontend
Obrigatórias (copie `.env.example` para `.env`):
- `REACT_APP_API_URL`: URL da API (padrão: http://localhost:3001)

## 🎨 Estilos e Temas

Os estilos estão em CSS puro. Para modificar:

- **Cores**: Encontre os valores hex nos arquivos `.css`
- **Tipografia**: Modifique `font-family` em `App.css`
- **Responsividade**: Use `@media (max-width: 768px)` nos CSS files

### Paleta de Cores Atual
- Primária: `#667eea` (roxo)
- Sucesso: `#28a745` (verde)
- Erro: `#dc3545` (vermelho)
- Info: `#007bff` (azul)
- Fundo: `#f5f5f5` (cinza claro)

## 🚀 Compilação para Produção

### Backend
```bash
cd backend
npm run build
npm start
```

Irá executar o código compilado da pasta `dist/`.

### Frontend
```bash
cd frontend
npm run build
```

Irá criar a pasta `build/` com a aplicação otimizada para produção.

## 📚 Recursos Úteis

- [Documentação Express.js](https://expressjs.com/)
- [Documentação React](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 🤝 Padrões de Código

### Nomeação
- **Classes**: PascalCase (ex: `RepositorioProdutos`)
- **Funções**: camelCase (ex: `validarCriacaoProduto`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `API_URL`)
- **Interfaces**: PascalCase (ex: `Produto`)

### Comentários
- Use JSDoc para funções públicas
- Use comentários para lógica complexa
- Use comentários de seção com `// =================`

### Imports
- Imports de bibliotecas externas primeiro
- Depois imports locais
- Depois tipos e interfaces

```typescript
import express from 'express';
import cors from 'cors';

import { validarCriacaoProduto } from '../services/ValidacaoService';
import { Produto } from '../models/Produto';
```

---

**Divirta-se desenvolvendo! 🎉**
