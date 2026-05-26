# 📦 Instalação e Configuração - shadcn/ui

Guia passo a passo para instalar e configurar o novo frontend com shadcn/ui.

## ✅ Pré-requisitos

- Node.js 16+
- npm ou yarn
- Terminal/CMD

## 🚀 Instalação Rápida

### 1. Instale as Dependências

```bash
cd frontend
npm install
```

### 2. Inicie o Servidor de Desenvolvimento

```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`.

## 📋 Verificação de Instalação

### Confirme que está tudo instalado:

```bash
# Verifique a versão do Node
node --version

# Verifique npm
npm --version

# Liste as dependências instaladas
npm list --depth=0
```

## 🎨 Estrutura Criada

### Arquivos Importantes

```
frontend/
├── tailwind.config.js          ← Configuração Tailwind
├── postcss.config.js           ← Configuração PostCSS
├── src/
│   ├── globals.css             ← Estilos globais + Tailwind
│   ├── App.tsx                 ← App refatorizado
│   ├── index.tsx               ← Entry point
│   ├── components/
│   │   ├── ui/                 ← Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── dialog.tsx
│   │   ├── FormularioProdutoShadcn.tsx
│   │   ├── ListaProdutosShadcn.tsx
│   │   ├── ModalConfirmacao.tsx (antigo, opcional)
│   │   ├── Alerta.tsx (antigo, opcional)
│   ├── lib/
│   │   └── utils.ts            ← Funções utilitárias
│   ├── services/
│   │   └── api.ts              ← Cliente HTTP
│   ├── types/
│   │   ├── Produto.ts
│   │   └── api.ts
│   ├── constants/
│   │   └── config.ts
│   ├── hooks/
│   │   └── useRequest.ts
│   └── utils/
│       └── formatadores.ts
```

## 🔧 Configurações

### tailwind.config.js
- Define tema das cores
- Estende configuração padrão
- Suporta dark mode

### postcss.config.js
- Integra Tailwind CSS
- Autoprefixer para compatibilidade

### src/globals.css
- CSS Variables para o tema
- Importa Tailwind directives
- Animações customizadas

## 📦 Dependências Instaladas

### Principais
- **tailwindcss** - Framework de CSS utilitário
- **@shadcn/ui** - Componentes React de alta qualidade
- **@radix-ui/*** - Componentes primitivos acessíveis
- **lucide-react** - Ícones SVG
- **class-variance-authority** - Gerenciador de variantes
- **clsx** e **tailwind-merge** - Utilitários de CSS

## 🚨 Solução de Problemas

### Erro: "Cannot find module '@/lib/utils'"

**Solução:**
Adicione ao `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Tailwind CSS não está funcionando

**Solução:**
1. Delete `node_modules` e `.next` (se existir)
2. Reinstale dependências: `npm install`
3. Reinicie o servidor: `npm start`

### Ícones do lucide-react não aparecem

**Solução:**
```bash
npm install lucide-react
npm start
```

## 📝 Primeiros Passos

### 1. Teste o Formulário

1. Abra o navegador em `http://localhost:3000`
2. Preencha o formulário com um produto
3. Clique em "Criar Produto"
4. Veja o produto aparecer na tabela

### 2. Teste a Edição

1. Clique no ícone "Editar" em um produto
2. Modifique os dados
3. Clique em "Atualizar"

### 3. Teste a Remoção

1. Clique no ícone "Remover" em um produto
2. Confirme na modal
3. O produto deve desaparecer

## 🎨 Customização

### Mudar Cores do Tema

Edite `src/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;           /* Azul padrão */
  --secondary: 217.2 91.2% 59.8%;         /* Azul claro */
  --destructive: 0 84.2% 60.2%;           /* Vermelho */
  /* ... mais cores ... */
}
```

### Adicionar Componentes shadcn/ui

Instale componentes adicionais conforme necessário:

```bash
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add dropdown-menu
```

## 🚀 Build para Produção

```bash
npm run build
```

Cria a pasta `build/` com a aplicação otimizada.

## 📊 Verificar Tamanho do Bundle

```bash
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'
```

## 🔍 Verificar Tipos TypeScript

```bash
npx tsc --noEmit
```

## 📚 Próximas Etapas

1. **Adicione Mais Componentes** conforme necessário
2. **Customize Cores e Fonts** do tema
3. **Implemente Dark Mode** se desejar
4. **Adicione Validação** de formulários com bibliotecas como React Hook Form
5. **Crie Testes** com Jest e React Testing Library

## 💡 Dicas

- Use a paleta de cores consistentemente
- Prefira usar componentes shadcn/ui ao criar CSS novo
- Mantenha componentes simples e reutilizáveis
- Documente customizações não óbvias

## ✨ Recursos Úteis

- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com)
- [lucide-react Icons](https://lucide.dev)

---

**Tudo pronto! Você pode começar a usar o novo frontend com shadcn/ui! 🎉**
