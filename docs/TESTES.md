# Guia de Testes

Documentação completa sobre testes da aplicação.

## Índice

1. [Testes Backend](#testes-backend)
2. [Testes Frontend](#testes-frontend)
3. [Cobertura](#cobertura)
4. [CI/CD](#cicd)
5. [Boas práticas](#boas-práticas)

## Testes Backend

### Tecnologias

- **Jest** - Framework de testes
- **ts-jest** - Suporte a TypeScript
- **jest-mock-extended** - Mocks avançados

### Executar testes

```bash
cd backend

# Executar todos os testes
npm test

# Modo watch (re-executa ao alterar arquivos)
npm run test:watch

# Com cobertura
npm run test:coverage
```

### Estrutura de testes

```
backend/src/__tests__/
├── validacao.test.ts      # Testes de ValidacaoService
├── produtos.test.ts       # Testes de ProdutoService
└── controllers.test.ts    # Testes de Controllers (em desenvolvimento)
```

### Testes disponíveis

#### ValidacaoService

Testa a validação de dados de entrada:

```bash
npm test validacao.test.ts
```

Coberturas:
- ✓ Validação de produto válido
- ✓ Rejeição de nome vazio
- ✓ Validação de preço negativo
- ✓ Validação de booleanos
- ✓ Múltiplos erros simultâneos

#### RepositorioProdutos

Testa operações CRUD:

```bash
npm test produtos.test.ts
```

Coberturas:
- ✓ Criar novo produto
- ✓ Auto-incremento de ID
- ✓ Listar produtos
- ✓ Buscar por ID
- ✓ Atualizar produto
- ✓ Remover produto

### Escrevendo novos testes

Exemplo básico:

```typescript
describe('MinhaService', () => {
  it('deve executar uma operação', () => {
    const resultado = minhaService.fazer();
    expect(resultado).toBe(true);
  });
});
```

Operações comuns:

```typescript
// Igualdade
expect(valor).toBe(esperado);
expect(objeto).toEqual(esperado);

// Existência
expect(valor).toBeDefined();
expect(valor).toBeNull();

// Tipos
expect(valor).toHaveProperty('prop');
expect(array).toContain(item);

// Números
expect(numero).toBeGreaterThan(5);
expect(numero).toBeLessThan(10);

// Strings
expect(texto).toMatch(/padrão/);
expect(texto).toContain('substring');

// Funções
expect(funcao).toThrow();
```

## Testes Frontend

### Configuração (em desenvolvimento)

Tecnologias:
- **Jest** - Framework
- **React Testing Library** - Componentes
- **@testing-library/user-event** - Interações do usuário

### Instalação

```bash
cd frontend

npm install --save-dev @testing-library/react @testing-library/jest-dom jest @testing-library/user-event
```

### Estrutura recomendada

```
frontend/src/__tests__/
├── components/
│   ├── FormularioProduto.test.tsx
│   └── ListaProdutos.test.tsx
├── services/
│   └── api.test.ts
└── hooks/
    └── useRequest.test.ts
```

### Exemplo de teste de componente

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { FormularioProdutoShadcn } from '../components/FormularioProdutoShadcn';

describe('FormularioProdutoShadcn', () => {
  it('deve renderizar o formulário', () => {
    render(<FormularioProdutoShadcn />);
    expect(screen.getByText(/nome/i)).toBeInTheDocument();
  });

  it('deve chamar callback ao submeter', async () => {
    const mock = jest.fn();
    render(<FormularioProdutoShadcn onSuccess={mock} />);
    
    fireEvent.click(screen.getByText(/enviar/i));
    expect(mock).toHaveBeenCalled();
  });
});
```

## Cobertura

### Gerar relatório

```bash
cd backend
npm run test:coverage
```

Abre relatório interativo em `coverage/lcov-report/index.html`

### Limites de cobertura

Configurado em `jest.config.json`:

```json
{
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 50,
      "lines": 50,
      "statements": 50
    }
  }
}
```

### Visualizar cobertura

```bash
# Backend
cd backend
npm run test:coverage

# Abrir relatório
open coverage/lcov-report/index.html  # macOS
# ou
xdg-open coverage/lcov-report/index.html  # Linux
```

## CI/CD

### GitHub Actions

Testes rodam automaticamente em:
- Push para `main` ou `develop`
- Pull requests

Verificações:
- ✓ Type checking (TypeScript)
- ✓ Testes unitários
- ✓ Cobertura
- ✓ Build
- ✓ Docker build
- ✓ Segurança (Snyk)

Ver status em: `.github/workflows/ci-cd.yml`

### Localmente

Simular CI/CD localmente:

```bash
# Backend
cd backend
npm run type-check
npm test
npm run build

# Frontend
cd frontend
npm run build

# Docker
docker build -t produtos-api:test ./backend
docker build -t produtos-web:test ./frontend
```

## Boas práticas

### Testes eficazes

1. **Teste comportamento, não implementação**
   ```typescript
   // ✓ Bom
   expect(repositorio.listar()).toHaveLength(1);
   
   // ✗ Evitar
   expect(repositorio.produtos[0]).toBeDefined();
   ```

2. **Use nomes descritivos**
   ```typescript
   // ✓ Bom
   it('deve retornar array vazio ao listar sem produtos')
   
   // ✗ Evitar
   it('testa listar')
   ```

3. **Arrange-Act-Assert (AAA)**
   ```typescript
   it('deve atualizar preço', () => {
     // Arrange - Setup
     const produto = criar();
     
     // Act - Executa
     const resultado = produto.atualizar({ price: 200 });
     
     // Assert - Valida
     expect(resultado.price).toBe(200);
   });
   ```

4. **Evite testes frágeis**
   ```typescript
   // ✓ Bom
   expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
   
   // ✗ Frágil
   expect(screen.getByClassName('btn-submit')).toBeInTheDocument();
   ```

5. **Teste casos extremos**
   ```typescript
   it('deve validar preço negativo');
   it('deve validar nome vazio');
   it('deve validar quantidade máxima de caracteres');
   ```

### Cobertura adequada

- **Services & Utils** - 80%+ cobertura
- **Controllers** - 70%+ cobertura
- **Componentes** - 60%+ cobertura
- **Integração** - Testes E2E (opcional)

### Performance

```bash
# Testes rápidos são essenciais
npm test -- --maxWorkers=4  # Paralelize

# Evite timeouts
jest.setTimeout(10000);  // Para testes assincronos
```

## Executar tudo

```bash
# Setup
./setup.sh

# Testes backend
cd backend && npm test

# Testes frontend (quando implementados)
cd ../frontend && npm test

# Build
npm run build

# Docker
docker-compose up
```

## Próximos passos

1. Implementar testes de controllers
2. Adicionar testes de integração
3. Configurar testes E2E com Cypress/Playwright
4. Aumentar cobertura para 80%
5. Adicionar performance benchmarks

## Referências

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [TypeScript + Jest](https://jestjs.io/docs/getting-started#using-typescript)
- [GitHub Actions](https://docs.github.com/en/actions)
