# ⚡ Quick Start - Frontend shadcn/ui

Comece a usar o novo frontend em 2 minutos!

## 📥 Instalação (1 minuto)

```bash
# Navegue até a pasta frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

Pronto! O navegador abrirá em `http://localhost:3000`.

## ✅ Checklist Rápido

- [ ] Node.js 16+ instalado
- [ ] `npm install` executado
- [ ] `npm start` funcionando
- [ ] Navegador aberto em localhost:3000
- [ ] Formulário aparecendo
- [ ] Backend rodando em http://localhost:3001

## 🧪 Teste Rápido

1. **Criar Produto:**
   - Preencha: Nome, Descrição, Preço, Categoria
   - Clique "Criar Produto"
   - Veja o produto aparecer na tabela

2. **Editar Produto:**
   - Clique no ícone ✏️ (editar)
   - Modifique os dados
   - Clique "Atualizar"

3. **Remover Produto:**
   - Clique no ícone 🗑️ (remover)
   - Confirme no modal
   - Produto desaparece

## 🎨 O Que Mudou

| Antes | Depois |
|-------|--------|
| CSS puro | Tailwind CSS |
| Componentes customizados | shadcn/ui |
| Ícones Unicode | lucide-react |
| Hard-coded styles | CSS Variables |

## 📚 Arquivos Principais

```
frontend/src/
├── App.tsx                       ← Componente principal
├── globals.css                   ← Estilos Tailwind
├── components/
│   ├── FormularioProdutoShadcn.tsx   ← Novo formulário
│   ├── ListaProdutosShadcn.tsx       ← Nova lista
│   └── ui/                       ← Componentes shadcn/ui
├── lib/utils.ts                  ← Funções auxiliares
├── services/api.ts               ← Cliente HTTP
└── types/                        ← TypeScript types
```

## 🔧 Problemas Comuns

### "Cannot find module '@/lib/utils'"
✅ Já resolvido! Arquivo `src/lib/utils.ts` criado.

### "Tailwind CSS não funciona"
```bash
rm -rf node_modules
npm install
npm start
```

### "Ícones não aparecem"
✅ lucide-react já instalado! Basta usar:
```tsx
import { Edit2, Trash2, Loader2 } from 'lucide-react';
```

## 💻 Estrutura Básica Já Pronta

```tsx
// FormularioProduto
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>
    <Input />
    <Button />
  </CardContent>
</Card>

// ListaProdutos
<Dialog>  {/* Modal */}
  <Table>  {/* Tabela */}
    <Button />  {/* Ações */}
  </Table>
</Dialog>
```

## 🎯 Próximas Etapas (Opcionais)

1. **Adicione Mais Componentes:**
   ```bash
   npx shadcn-ui@latest add select
   npx shadcn-ui@latest add pagination
   npx shadcn-ui@latest add toast
   ```

2. **Customize as Cores:**
   Edite `src/globals.css` - seção `:root`

3. **Adicione Dark Mode:**
   Veja documentação em `EXTENSAO_SHADCN.md`

## 📖 Documentação Completa

- 📄 [FRONTEND_SHADCN.md](./FRONTEND_SHADCN.md) - Detalhes técnicos
- 📄 [INSTALACAO_SHADCN.md](./INSTALACAO_SHADCN.md) - Guia de instalação
- 📄 [EXTENSAO_SHADCN.md](./EXTENSAO_SHADCN.md) - Como adicionar componentes

## 🚀 Comandos Úteis

```bash
# Inicia desenvolvimento
npm start

# Build para produção
npm run build

# Testa types TypeScript
npm run type-check

# Executa testes
npm test
```

## ✨ Benefícios do shadcn/ui

✅ Componentes profissionais prontos  
✅ Acessibilidade WCAG incluída  
✅ Tailwind CSS + Radix UI  
✅ Fácil de customizar  
✅ Dark mode suportado  
✅ Sem dependência de versão  

## 💡 Dica de Ouro

Use o arquivo `src/globals.css` para customizar TUDO:
- Cores
- Fonts
- Animações
- Dark mode

## 🎉 Pronto!

Você tem um **frontend profissional e moderno** pronto para usar!

**Desenvolvido em 2024 - Desafio Técnico Full Stack**

---

**Dúvidas? Consulte a documentação em FRONTEND_SHADCN.md! 📚**
