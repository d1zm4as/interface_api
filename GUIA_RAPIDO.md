# 🚀 Guia Rápido de Início

Comece a trabalhar no projeto em 3 passos simples.

## 1️⃣ Instale as Dependências

```bash
# Backend
cd backend
npm install

# Frontend (em outra pasta)
cd frontend
npm install
cp .env.example .env
```

## 2️⃣ Inicie o Backend

```bash
cd backend
npm run dev
```

Você verá:
```
🚀 Servidor iniciado na porta 3001
📍 http://localhost:3001
```

## 3️⃣ Inicie o Frontend (novo terminal)

```bash
cd frontend
npm start
```

Abrirá automaticamente em `http://localhost:3000`

---

## ✅ Testando Rapidamente

### No Terminal (Backend)
```bash
# Listar produtos
curl http://localhost:3001/produtos

# Criar produto
curl -X POST http://localhost:3001/produtos \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","description":"Desc","price":100,"category":"Cat","active":true}'
```

### No Navegador (Frontend)
1. Vá para http://localhost:3000
2. Preencha o formulário e clique em "Criar Produto"
3. Veja o produto aparecer na tabela abaixo
4. Clique em "Editar" ou "Remover"

---

## 📁 Estrutura Importante

```
backend/
  └─ src/
     ├─ models/       (Tipos de dados)
     ├─ services/     (Lógica de negócio)
     ├─ controllers/  (Requisições HTTP)
     └─ routes/       (Endpoints)

frontend/
  └─ src/
     ├─ components/   (Formulário e Lista)
     ├─ services/     (Chamadas de API)
     └─ types/        (Tipos TypeScript)
```

---

## 📖 Documentação Completa

- **[README.md](./README.md)** - Documentação principal
- **[COMMITS.md](./COMMITS.md)** - Mensagens de commits ideais
- **[INSTRUÇÕES_DESENVOLVIMENTO.md](./INSTRUÇÕES_DESENVOLVIMENTO.md)** - Guia detalhado
- **[CHECKLIST.md](./CHECKLIST.md)** - Validação de requisitos

---

## 🔥 Comandos Úteis

### Backend
```bash
npm run dev           # Modo desenvolvimento (com auto-reload)
npm run build         # Compilar TypeScript
npm start             # Rodar produção
npm run type-check    # Verificar tipos
```

### Frontend
```bash
npm start             # Desenvolvimento
npm run build         # Build otimizado
npm test              # Executar testes
```

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Backend não inicia | Verifique se porta 3001 está livre |
| Frontend não conecta | Confirme se `.env` tem `REACT_APP_API_URL` correto |
| CORS error | Backend já deve estar rodando na porta 3001 |
| Dados não aparecem | Recarregue o navegador (Ctrl + Shift + R) |

---

## 💡 Próximo Passo

Leia o arquivo **[COMMITS.md](./COMMITS.md)** para saber exatamente quando fazer commits e quais mensagens usar!

---

**Desenvolvido em 2024 - Desafio Técnico Full Stack Júnior**
