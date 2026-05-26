# 🎨 Frontend com shadcn/ui

Reconstrução do frontend com shadcn/ui, Tailwind CSS e componentes modernos.

## ✨ Mudanças Principais

### 1. **Novo Sistema de Styling**
- ❌ CSS puro substituído por **Tailwind CSS**
- ✅ Componentes reutilizáveis com **shadcn/ui**
- ✅ Design system consistente
- ✅ Melhor responsividade

### 2. **Componentes shadcn/ui Utilizados**

#### UI Components
- `Button` - Botões com múltiplas variantes
- `Card` - Containers estilizados
- `Input` - Campos de texto
- `Textarea` - Campos multi-linha
- `Label` - Labels acessíveis
- `Dialog` - Modal para confirmações

#### Ícones
- `lucide-react` - Ícones SVG modernos
- Ícones usados: Package, Edit2, Trash2, AlertCircle, CheckCircle2, Loader2, ArrowUp

### 3. **Estrutura de Pastas**

```
frontend/src/
├── components/
│   ├── ui/                      # Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   └── dialog.tsx
│   ├── FormularioProdutoShadcn.tsx    # Novo formulário
│   ├── ListaProdutosShadcn.tsx        # Nova lista
│   └── ModalConfirmacao.tsx           # Modal (antigo)
├── lib/
│   └── utils.ts                 # Utilitários (cn function)
├── globals.css                  # Tailwind + CSS global
├── tailwind.config.js           # Configuração Tailwind
├── postcss.config.js            # PostCSS config
└── App.tsx                      # App refatorizado

```

### 4. **Tailwind CSS**

#### Configuração
- Tema customizável com CSS Variables
- Cores dark mode incluídas
- Animações predefinidas
- Responsividade mobile-first

#### Espaçamento
- Padding/Margin padrão: 4px increments
- Grid responsiva: 1 coluna (mobile), 2 colunas (md+)

### 5. **Componentes Refatorados**

#### FormularioProduto (nova versão)
```typescript
// Usa componentes shadcn/ui
<Card>
  <CardHeader>
    <CardTitle>Novo Produto</CardTitle>
  </CardHeader>
  <CardContent>
    <Input />
    <Textarea />
    <Button />
  </CardContent>
</Card>
```

#### ListaProdutos (nova versão)
```typescript
// Dialog integrado para confirmação
<Dialog open={modalAberto} onOpenChange={setModalAberto}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Remover Produto</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### 6. **Dependências Adicionadas**

```json
{
  "@shadcn/ui": "^0.8.0",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-label": "^2.0.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "lucide-react": "^0.263.1",
  "tailwind-merge": "^2.2.0",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24"
}
```

## 🚀 Como Usar

### Instalação

```bash
cd frontend
npm install
npm start
```

### Adicionar Novos Componentes shadcn/ui

Para adicionar um novo componente (ex: Select):

```bash
npx shadcn-ui@latest add select
```

Isso cria o arquivo em `src/components/ui/select.tsx`.

### Customizar Tema

Edite `src/globals.css` para modificar as cores CSS Variables:

```css
:root {
  --primary: 221.2 83.2% 53.3%;      /* Azul */
  --destructive: 0 84.2% 60.2%;      /* Vermelho */
  --success: 142.1 70.6% 45.3%;      /* Verde */
}
```

## 📊 Comparação: Antes vs Depois

| Aspecto | Antes (CSS Puro) | Depois (shadcn/ui) |
|---------|------------------|-------------------|
| Styling | CSS custom | Tailwind + shadcn/ui |
| Ícones | Unicode | lucide-react |
| Componentes | Customizados | Padronizados |
| Tema | Hard-coded | CSS Variables |
| Responsividade | Media queries | Tailwind breakpoints |
| Estado Modal | Customizado | Radix UI Dialog |
| TypeScript | Básico | Completo com CVA |

## 🎯 Benefícios

✅ **Design System Consistente**
- Componentes reutilizáveis
- Estilo visual padronizado

✅ **Manutenção Simplificada**
- Código menos repetitivo
- Menos CSS para manter

✅ **Acessibilidade**
- Componentes Radix UI (WCAG compliant)
- Suporte a keyboard navigation

✅ **Performance**
- Tailwind CSS é otimizado
- Menos CSS gerado

✅ **Customização Fácil**
- Tailwind CVA para variantes
- CSS Variables para temas

## 🔧 Customizações Comuns

### Adicionar Nova Cor

```css
/* src/globals.css */
:root {
  --nova-cor: 180 100% 50%;
}
```

```tsx
<Button className="bg-[hsl(var(--nova-cor))]">
  Clique aqui
</Button>
```

### Criar Variante de Botão

```tsx
// src/components/ui/button.tsx
const buttonVariants = cva("...", {
  variants: {
    variant: {
      minha_variante: "bg-custom text-custom hover:bg-custom-hover",
    }
  }
});

// Usar
<Button variant="minha_variante">Clique</Button>
```

### Adicionar Animação

```css
/* src/globals.css */
@layer utilities {
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
}
```

## 📚 Recursos

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [lucide-react Icons](https://lucide.dev)
- [Class Variance Authority](https://cva.style)

## 🎨 Próximas Melhorias

- [ ] Tema dark mode completo
- [ ] Animações de transição
- [ ] Componentes adicionais (Search, Filter, Pagination)
- [ ] Story book para documentação
- [ ] Testes com Testing Library

---

**Frontend modernizado e pronto para crescer! 🚀**
