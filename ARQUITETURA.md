# 🏗️ Arquitetura do Projeto - 2024

## 📊 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     NAVEGADOR DO USUÁRIO (localhost:3000)               │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND - React + TypeScript                     │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                      App Component                             │   │
│  │  (Layout, Header, Footer, Botão Voltar ao Topo)              │   │
│  └──────────────────────────┬─────────────────────────────────────┘   │
│                             │                                          │
│           ┌─────────────────┴─────────────────┐                       │
│           ↓                                   ↓                       │
│  ┌──────────────────────┐         ┌──────────────────────┐           │
│  │ FormularioProduto    │         │ ListaProdutos        │           │
│  │ (shadcn/ui)          │         │ (shadcn/ui)          │           │
│  │                      │         │                      │           │
│  │ - Card              │         │ - Card              │           │
│  │ - Input             │         │ - Table             │           │
│  │ - Textarea          │         │ - Dialog (remover)  │           │
│  │ - Label             │         │ - Buttons           │           │
│  │ - Button            │         │ - Icons (lucide)    │           │
│  │ - Icons (lucide)    │         │ - Status badges     │           │
│  └────────┬────────────┘         └─────────┬───────────┘           │
│           │                               │                          │
│           └───────────┬───────────────────┘                         │
│                       ↓                                             │
│            ┌──────────────────────┐                                │
│            │  ProdutoService      │ (services/api.ts)             │
│            │  (Axios HTTP)        │                                │
│            │                      │                                │
│            │ - listarProdutos()   │                                │
│            │ - obterProduto()     │                                │
│            │ - criarProduto()     │                                │
│            │ - atualizarProduto() │                                │
│            │ - removerProduto()   │                                │
│            └────────┬─────────────┘                                │
│                     │                                              │
│           ┌─────────┴────────────┐                                │
│           ↓                      ↓                                │
│   ┌──────────────┐      ┌──────────────────────────┐             │
│   │ Types        │      │ Constants & Utils        │             │
│   │ - Produto    │      │ - Categorias padrão    │             │
│   │ - API        │      │ - Mensagens            │             │
│   │ - Validação  │      │ - Formatadores         │             │
│   └──────────────┘      │ - Hooks customizados   │             │
│                         └──────────────────────────┘             │
│                                                                  │
│            ┌──────────────────────────────────┐                │
│            │   Tailwind CSS + shadcn/ui       │                │
│            │                                  │                │
│            │ - globals.css                   │                │
│            │ - tailwind.config.js            │                │
│            │ - Componentes UI: Button, Card, │                │
│            │   Input, Dialog, etc.           │                │
│            └──────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓ (HTTP)
                        ┌──────────────────────────┐
                        │    API REST Backend      │
                        │  (http://localhost:3001) │
                        └──────────────┬───────────┘
                                       ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    BACKEND - Node.js + Express + TypeScript             │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │                   Express Server                              │   │
│  │  (app.listen(3001) com CORS)                                 │   │
│  └────────────────────────┬─────────────────────────────────────┘   │
│                           │                                          │
│         ┌─────────────────┴──────────────────┐                      │
│         ↓                                    ↓                      │
│    ┌────────────┐                  ┌──────────────────┐            │
│    │ Routes     │                  │ Middlewares      │            │
│    │ /produtos  │                  │                  │            │
│    │ GET        │                  │ - validação      │            │
│    │ GET :id    │                  │ - logging        │            │
│    │ POST       │                  │ - segurança      │            │
│    │ PUT :id    │                  │ - error handling │            │
│    │ DELETE :id │                  └──────────────────┘            │
│    └─────┬──────┘                                                  │
│          │                                                          │
│          ↓                                                          │
│    ┌──────────────────────┐                                       │
│    │ Controllers          │                                       │
│    │                      │                                       │
│    │ - listarProdutos()   │                                       │
│    │ - obterProduto()     │                                       │
│    │ - criarProduto()     │                                       │
│    │ - atualizarProduto() │                                       │
│    │ - removerProduto()   │                                       │
│    └────────┬─────────────┘                                       │
│             │                                                      │
│             ↓                                                      │
│    ┌──────────────────────┐                                       │
│    │ Services/Business    │                                       │
│    │                      │                                       │
│    │ - RepositorioProdutos│  ┌─────────────────┐                │
│    │   (CRUD em memória)  │  │ ValidacaoService│                │
│    │                      │  │                 │                │
│    │ - LogService         │  │ - validarCriacao│                │
│    │ - ErroService        │  │ - validarUpdate │                │
│    │                      │  └─────────────────┘                │
│    └────────┬─────────────┘                                       │
│             │                                                      │
│             ↓                                                      │
│    ┌──────────────────────┐                                       │
│    │ Data Persistence     │                                       │
│    │                      │                                       │
│    │ Array em Memória:    │                                       │
│    │ ┌────────────────┐   │                                       │
│    │ │ produtosArray  │   │                                       │
│    │ │ [{id, name,    │   │                                       │
│    │ │   desc, price, │   │                                       │
│    │ │   ...}]        │   │                                       │
│    │ └────────────────┘   │                                       │
│    └──────────────────────┘                                       │
│                                                                   │
│    Models:                                                        │
│    └──────────────────────────────────────────────────┐          │
│    │ interface Produto {                             │          │
│    │   id: string | number                           │          │
│    │   name: string                                  │          │
│    │   description: string                           │          │
│    │   price: number                                 │          │
│    │   category: string                              │          │
│    │   active: boolean                               │          │
│    │   createdAt: string                             │          │
│    │ }                                               │          │
│    └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🔗 Fluxo de Dados

### Criar Produto

```
1. Frontend: Usuário preenche formulário
                    ↓
2. React: Valida dados localmente
                    ↓
3. API Call: POST /produtos (Axios)
                    ↓
4. Backend: ProdutoController.criarProduto()
                    ↓
5. Validação: ValidacaoService.validarCriacaoProduto()
                    ↓
6. Business: RepositorioProdutos.criar()
                    ↓
7. Memória: Array atualizado
                    ↓
8. Response: HTTP 201 + Produto criado
                    ↓
9. Frontend: Mostra mensagem de sucesso
                    ↓
10. UI: Atualiza lista de produtos
```

### Listar Produtos

```
Frontend Request
        ↓
GET /produtos
        ↓
ProdutoController.listarProdutos()
        ↓
RepositorioProdutos.listar()
        ↓
Retorna Array de Produtos
        ↓
Response 200 com dados
        ↓
React useState + useEffect
        ↓
Re-render da tabela
```

## 📁 Estrutura de Pastas

```
interface_api/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Produto.ts
│   │   ├── services/
│   │   │   ├── ProdutoService.ts
│   │   │   ├── ValidacaoService.ts
│   │   │   ├── LogService.ts
│   │   │   └── ErroService.ts
│   │   ├── controllers/
│   │   │   └── ProdutoController.ts
│   │   ├── routes/
│   │   │   └── produtos.ts
│   │   ├── middlewares/
│   │   │   └── validacao.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   └── dialog.tsx
│   │   │   ├── FormularioProdutoShadcn.tsx
│   │   │   ├── ListaProdutosShadcn.tsx
│   │   │   ├── ModalConfirmacao.tsx
│   │   │   └── Alerta.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   ├── Produto.ts
│   │   │   └── api.ts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── constants/
│   │   │   └── config.ts
│   │   ├── hooks/
│   │   │   └── useRequest.ts
│   │   ├── utils/
│   │   │   └── formatadores.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── globals.css
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
└── docs/
    ├── README.md
    ├── COMMITS.md
    ├── GUIA_RAPIDO.md
    ├── INSTRUÇÕES_DESENVOLVIMENTO.md
    ├── CHECKLIST.md
    ├── DEPLOY.md
    ├── FRONTEND_SHADCN.md
    ├── INSTALACAO_SHADCN.md
    ├── EXTENSAO_SHADCN.md
    ├── QUICKSTART_SHADCN.md
    └── RESUMO_ATUALIZACOES.md
```

## 🔀 Decisões de Arquitetura

### Frontend
✅ **React com Hooks** - Simples e eficiente  
✅ **TypeScript** - Type safety  
✅ **shadcn/ui** - Componentes reutilizáveis  
✅ **Tailwind CSS** - Estilos utilitários  
✅ **Axios** - HTTP client simples  

### Backend
✅ **Express.js** - Framework leve  
✅ **TypeScript** - Type safety  
✅ **Arquitetura em Camadas** - Separação de responsabilidades  
✅ **Array em Memória** - Simplicidade (sem banco de dados)  
✅ **CORS** - Integração frontend-backend  

## 🚀 Escalabilidade Futura

### De Memória para Banco de Dados
```
Atual: RepositorioProdutos (array)
         ↓
Futuro: RepositorioProdutos (PostgreSQL)
         → driver: pg
         → migrations: knex.js
         → queries: SQL
```

### Adicionar Autenticação
```
Atual: Sem autenticação
         ↓
Futuro: JWT Auth
         → middleware: passport.js
         → tokens: JWT
         → refresh: rotation
```

### Adicionar Validação
```
Atual: Validação manual
         ↓
Futuro: Zod/Joi
         → schema validation
         → custom rules
```

## 📊 Tecnologias por Camada

| Camada | Tecnologia | Versão |
|--------|-----------|---------|
| Apresentação | React | 18.2.0 |
| Styling | Tailwind CSS | 3.3.0 |
| UI Components | shadcn/ui | 0.8.0 |
| Backend | Express | 4.18.2 |
| Lang | TypeScript | 5.0.0 |
| HTTP Client | Axios | 1.4.0 |
| Icons | lucide-react | 0.263.1 |

---

**Arquitetura: Simples, Escalável e Moderna! 🏗️**
