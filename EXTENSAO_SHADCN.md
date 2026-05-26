# 🛠️ Extensão do Frontend - Componentes Adicionais

Guia para adicionar mais componentes shadcn/ui e expandir o frontend.

## 📦 Componentes Recomendados para Adicionar

### 1. **Pagination** - Para Paginação de Produtos

```bash
npx shadcn-ui@latest add pagination
```

**Uso:**
```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### 2. **Select** - Dropdown Melhorado

```bash
npx shadcn-ui@latest add select
```

**Uso:**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecione uma categoria" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="eletrônicos">Eletrônicos</SelectItem>
    <SelectItem value="livros">Livros</SelectItem>
  </SelectContent>
</Select>
```

### 3. **Checkbox** - Checkboxes Estilizados

```bash
npx shadcn-ui@latest add checkbox
```

**Uso:**
```tsx
import { Checkbox } from '@/components/ui/checkbox';

<Checkbox 
  id="active"
  checked={formData.active}
  onCheckedChange={(checked) => setFormData({...formData, active: checked})}
/>
```

### 4. **Badge** - Rótulos

```bash
npx shadcn-ui@latest add badge
```

**Uso:**
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="outline">Ativo</Badge>
<Badge variant="secondary">Inativo</Badge>
<Badge variant="destructive">Não Disponível</Badge>
```

### 5. **Toast/Toaster** - Notificações

```bash
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add toaster
```

**Uso:**
```tsx
import { useToast } from '@/components/ui/use-toast';

const { toast } = useToast();

toast({
  title: "Sucesso!",
  description: "Produto criado com sucesso.",
  duration: 3000,
});
```

### 6. **Table** - Tabelas Melhoradas

```bash
npx shadcn-ui@latest add table
```

**Uso:**
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Preço</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Produto A</TableCell>
      <TableCell>R$ 100</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 7. **Sheet** - Sidebar Modal

```bash
npx shadcn-ui@latest add sheet
```

### 8. **Tabs** - Abas/Tabs

```bash
npx shadcn-ui@latest add tabs
```

**Uso:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="todos">
  <TabsList>
    <TabsTrigger value="todos">Todos</TabsTrigger>
    <TabsTrigger value="ativos">Ativos</TabsTrigger>
  </TabsList>
  <TabsContent value="todos">
    {/* Todos os produtos */}
  </TabsContent>
  <TabsContent value="ativos">
    {/* Apenas ativos */}
  </TabsContent>
</Tabs>
```

### 9. **Command** - Command Palette/Search

```bash
npx shadcn-ui@latest add command
```

### 10. **Popover** - Popovers/Tooltips

```bash
npx shadcn-ui@latest add popover
```

## 🔄 Melhorias Sugeridas

### 1. Adicionar Busca de Produtos

```tsx
// components/PesquisaProdutos.tsx
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export const PesquisaProdutos = ({ onBuscar }) => (
  <div className="relative">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    <Input
      placeholder="Buscar produtos..."
      className="pl-8"
      onChange={(e) => onBuscar(e.target.value)}
    />
  </div>
);
```

### 2. Adicionar Filtros

```tsx
// components/FiltrosProdutos.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

export const FiltrosProdutos = ({ onFiltrar }) => (
  <div className="flex gap-4 p-4 bg-muted rounded-lg">
    <Select onValueChange={(value) => onFiltrar({ categoria: value })}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filtrar por categoria" />
      </SelectTrigger>
      <SelectContent>
        {/* Categorias */}
      </SelectContent>
    </Select>
    <Button variant="outline">Limpar Filtros</Button>
  </div>
);
```

### 3. Dark Mode

```bash
npm install next-themes
```

```tsx
// App.tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <YourApp />
</ThemeProvider>
```

### 4. React Hook Form para Validação

```bash
npm install react-hook-form
```

```tsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

### 5. Zod para Validação em TypeScript

```bash
npm install zod
```

```tsx
import { z } from 'zod';

const SchemaProduto = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
});
```

## 🎯 Roadmap de Melhorias

### Fase 1: Base (✅ Concluído)
- [x] Formulário de produtos
- [x] Listagem de produtos
- [x] Componentes shadcn/ui

### Fase 2: Melhorias
- [ ] Paginação
- [ ] Busca e filtros
- [ ] Validação com React Hook Form
- [ ] Notificações com Toast

### Fase 3: Avançado
- [ ] Dark mode
- [ ] Temas customizáveis
- [ ] Exportação de dados (CSV, PDF)
- [ ] Dashboard com gráficos

### Fase 4: Produção
- [ ] Testes E2E com Cypress
- [ ] Testes unitários com Jest
- [ ] Performance optimization
- [ ] Documentação completa

## 📚 Exemplos de Componentes Customizados

### Header com Logo e Nav

```tsx
// components/Header.tsx
import { Package, Menu } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => (
  <header className="border-b">
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6" />
        <h1 className="text-xl font-bold">Produtos</h1>
      </div>
      <Button variant="ghost" size="icon">
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  </header>
);
```

### Card com Ações

```tsx
// components/ProdutoCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Edit2, Trash2 } from 'lucide-react';

export const ProdutoCard = ({ produto, onEdit, onDelete }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{produto.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground mb-4">{produto.description}</p>
      <p className="text-2xl font-bold mb-4">R$ {produto.price.toFixed(2)}</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(produto)}
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(produto.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remover
        </Button>
      </div>
    </CardContent>
  </Card>
);
```

## 🚀 Deploy

### Com Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Com Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

## 💡 Dicas

1. **Mantenha Componentes Pequenos** - Mais fácil de testar e reutilizar
2. **Use TypeScript** - Melhor IntelliSense e segurança
3. **Documente Componentes** - Use JSDoc para documentação
4. **Teste Responsividade** - Use DevTools do navegador
5. **Otimize Performance** - Lazy loading de componentes

## 📖 Referências

- [shadcn/ui All Components](https://ui.shadcn.com/docs)
- [Tailwind CSS Components](https://www.tailwindcomponents.com)
- [Radix UI Primitives](https://www.radix-ui.com/docs)
- [React Best Practices](https://react.dev)

---

**Seu frontend está pronto para crescer com novos componentes! 🚀**
