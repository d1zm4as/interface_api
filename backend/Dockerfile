FROM node:18-alpine

WORKDIR /app

# Instala dependências completas para gerar o Prisma Client e compilar o projeto
COPY package*.json ./
RUN npm ci

# Copia o restante do código e prepara o Prisma
COPY . .
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/produtos_db?schema=public
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
