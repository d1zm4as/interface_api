# Setup Automático do Projeto

O script `setup.sh` automatiza a instalação e configuração de toda a aplicação.

## Uso

```bash
./setup.sh
```

## O que o script faz

1. **Verifica requisitos**
   - Node.js (versão 16+)
   - npm

2. **Configura Backend**
   - Cria arquivo `.env` se não existir
   - Instala dependências npm
   - Compila TypeScript

3. **Configura Frontend**
   - Cria arquivo `.env` se não existir
   - Instala dependências npm

4. **Pronto para usar**
   - Exibe instruções finais
   - Mostra portas disponíveis

## Pré-requisitos

- Node.js 16+ ([instalar aqui](https://nodejs.org/))
- npm (incluído com Node.js)
- Git (opcional, para clonar o repositório)

## Após o setup

Para iniciar a aplicação:

### Opção 1: Modo desenvolvimento (2 terminais)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Opção 2: Docker Compose (recomendado)

```bash
docker-compose up
```

## Variáveis de ambiente criadas

### Backend (.env)
- `PORT=3001` - Porta do servidor API
- `NODE_ENV=development` - Ambiente
- `CORS_ORIGIN=http://localhost:3000` - Origem CORS permitida

### Frontend (.env)
- `REACT_APP_API_URL=http://localhost:3001` - URL da API

## Acesso à aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Produtos Endpoint:** http://localhost:3001/produtos

## Solução de problemas

### "Node.js não está instalado"
Instale Node.js de https://nodejs.org/

### Porta 3000/3001 já em uso
Altere as portas nos arquivos `.env` e reinicie

### Erro ao instalar dependências
```bash
# Limpar cache npm
npm cache clean --force

# Tentar novamente
./setup.sh
```

### Permissão negada ao executar setup.sh
```bash
chmod +x setup.sh
./setup.sh
```

## Suporte

Para mais informações, consulte:
- [README.md](../README.md) - Visão geral do projeto
- [INSTRUÇÕES_DESENVOLVIMENTO.md](../docs/INSTRUÇÕES_DESENVOLVIMENTO.md) - Guia de desenvolvimento
