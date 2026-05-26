# Use official Node.js LTS image
FROM node:18-alpine

# Define diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale dependências
RUN npm ci --only=production

# Copie código-fonte
COPY . .

# Compile TypeScript
RUN npm run build

# Exponha a porta
EXPOSE 3001

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3001

# Inicie a aplicação
CMD ["npm", "start"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
