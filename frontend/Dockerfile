# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Instale serve para servir arquivos estáticos
RUN npm install -g serve

# Copie package.json do stage anterior
COPY --from=builder /app/package*.json ./

# Instale apenas dependências de produção
RUN npm ci --only=production

# Copie build do stage anterior
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

# Exponha a porta
EXPOSE 3000

# Variáveis de ambiente
ENV REACT_APP_API_URL=http://localhost:3001

# Inicie a aplicação
CMD ["serve", "-s", "build", "-l", "3000"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { if (res.statusCode !== 200) throw new Error(res.statusCode) })"
