#!/bin/bash

# Script de Setup Automático do Projeto
# Instala e configura toda a aplicação

set -e

echo "==============================================="
echo "Setup Automático - API de Gerenciamento"
echo "==============================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
log_info() {
  echo -e "${GREEN}✓${NC} $1"
}

log_warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
  echo -e "${RED}✗${NC} $1"
}

# Verificar Node.js
echo "Verificando requisitos..."
if ! command -v node &> /dev/null; then
  log_error "Node.js não está instalado. Por favor, instale Node.js 16+ antes de continuar."
  exit 1
fi
log_info "Node.js $(node -v) encontrado"

if ! command -v npm &> /dev/null; then
  log_error "npm não está instalado."
  exit 1
fi
log_info "npm $(npm -v) encontrado"

echo ""
echo "Configurando Backend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"

cd backend

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
  log_info "Criando arquivo .env do backend..."
  if [ -f .env.example ]; then
    cp .env.example .env
  else
    cat > .env << EOF
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EOF
  fi
fi

log_info "Instalando dependências..."
npm install

log_info "Gerando Prisma Client..."
npm run prisma:generate

log_info "Compilando TypeScript..."
npm run build

log_info "Backend configurado com sucesso!"

cd ..

echo ""
echo "Configurando Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"

cd frontend

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
  log_info "Criando arquivo .env do frontend..."
  if [ -f .env.example ]; then
    cp .env.example .env
  else
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
EOF
  fi
fi

log_info "Instalando dependências..."
npm install

log_info "Frontend configurado com sucesso!"

cd ..

echo ""
echo "==============================================="
echo -e "${GREEN}Setup concluído com sucesso!${NC}"
echo "==============================================="
echo ""
echo "Para iniciar o projeto, execute:"
echo ""
echo "  Backend (Terminal 1):"
echo "    cd backend && npm run dev"
echo ""
echo "  Frontend (Terminal 2):"
echo "    cd frontend && npm start"
echo ""
echo "Ou use Docker Compose:"
echo "  docker-compose up"
echo ""
echo "A aplicação estará disponível em:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend: http://localhost:3001"
echo ""
