# Deploy e Containerização

Guia completo para deployar a aplicação usando Docker.

## Índice

1. [Docker Compose (Desenvolvimento)](#docker-compose-desenvolvimento)
2. [Docker Individual](#docker-individual)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Deployment em Produção](#deployment-em-produção)
5. [Troubleshooting](#troubleshooting)

## Docker Compose (Desenvolvimento)

Forma mais rápida de iniciar toda a aplicação.

### Pré-requisitos

- Docker ([instalar](https://www.docker.com/products/docker-desktop))
- Docker Compose (incluído com Docker Desktop)

### Iniciar

```bash
docker-compose up
```

Primeira execução leva mais tempo (fazer build das imagens).

### Parar

```bash
docker-compose down
```

### Logs

```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend
```

### Acessar aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Produtos: http://localhost:3001/produtos

## Docker Individual

### Backend

**Build:**
```bash
docker build -t produtos-api:latest ./backend
```

**Run:**
```bash
docker run -p 3001:3001 -e NODE_ENV=production produtos-api:latest
```

**Com variáveis:**
```bash
docker run \
  -p 3001:3001 \
  -e NODE_ENV=production \
  -e CORS_ORIGIN=http://localhost:3000 \
  produtos-api:latest
```

### Frontend

**Build:**
```bash
docker build -t produtos-web:latest ./frontend
```

**Run:**
```bash
docker run -p 3000:3000 produtos-web:latest
```

### Network customizada

```bash
# Criar network
docker network create produtos-net

# Backend
docker run \
  --name api \
  --network produtos-net \
  -p 3001:3001 \
  -e NODE_ENV=production \
  produtos-api:latest

# Frontend
docker run \
  --name web \
  --network produtos-net \
  -p 3000:3000 \
  -e REACT_APP_API_URL=http://api:3001 \
  produtos-web:latest
```

## Variáveis de Ambiente

### Backend

```env
# Porta (padrão: 3001)
PORT=3001

# Ambiente (production | development)
NODE_ENV=production

# Origem CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend

```env
# URL da API (padrão: http://localhost:3001)
REACT_APP_API_URL=http://localhost:3001
```

### Docker Compose

Edite `docker-compose.yml`:

```yaml
services:
  backend:
    environment:
      NODE_ENV: production
      PORT: 3001
      CORS_ORIGIN: http://localhost:3000
  
  frontend:
    environment:
      REACT_APP_API_URL: http://localhost:3001
```

## Deployment em Produção

### Opções de hosting

#### 1. Heroku

**Backend:**
```bash
heroku create meu-app-api
git push heroku main
heroku config:set NODE_ENV=production
heroku open
```

**Frontend:**
```bash
heroku create meu-app-web
npm run build
git push heroku main
```

#### 2. AWS

**EC2 com Docker:**
```bash
# SSH na instância
ssh -i key.pem ubuntu@instance.ip

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone do repo
git clone https://github.com/seu-usuario/interface_api.git
cd interface_api

# Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

#### 3. DigitalOcean

```bash
# App Platform (easiest)
# Conectar GitHub repo, definir environment, deploy

# Ou Docker em Droplet
ssh root@droplet.ip
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
docker-compose up -d
```

#### 4. Railway / Render

Plataformas cloud simples para Node.js + React

1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Deploy automático

### Checklist de produção

- [ ] Build otimizado
- [ ] Variáveis de ambiente configuradas
- [ ] CORS properly configured
- [ ] HTTPS ativado
- [ ] Database configurada (se usar)
- [ ] Health checks implementados
- [ ] Logs monitorados
- [ ] Backups automatizados
- [ ] Domínio customizado
- [ ] SSL/TLS certificate

### Docker Compose de Produção

`docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  backend:
    image: produtos-api:latest
    restart: always
    environment:
      NODE_ENV: production
      PORT: 3001
      CORS_ORIGIN: https://seu-dominio.com
    ports:
      - "3001:3001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - produtos-network

  frontend:
    image: produtos-web:latest
    restart: always
    environment:
      REACT_APP_API_URL: https://api.seu-dominio.com
    ports:
      - "3000:3000"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - produtos-network

networks:
  produtos-network:
    driver: bridge
```

**Usar:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx reverse proxy (opcional)

`nginx.conf`:

```nginx
upstream backend {
    server backend:3001;
}

upstream frontend {
    server frontend:3000;
}

server {
    listen 80;
    server_name seu-dominio.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;

    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    location /api/ {
        proxy_pass http://backend/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
    }
}
```

## Troubleshooting

### Porta já em uso

```bash
# Encontrar processo
lsof -i :3001  # Backend
lsof -i :3000  # Frontend

# Matar processo
kill -9 <PID>

# Ou mudar porta
docker run -p 3002:3001 produtos-api:latest
```

### Container não inicia

```bash
# Ver logs
docker logs <container-id>

# Modo interativo para debug
docker run -it produtos-api:latest /bin/sh
```

### Frontend não consegue conectar API

1. Verificar `REACT_APP_API_URL`
2. Verificar CORS no backend
3. Verificar firewall
4. Testar com curl: `curl http://api:3001/produtos`

### Build muito lento

```bash
# Usar cache
docker build --no-cache=false -t produtos-api ./backend

# Multi-stage é automaticamente otimizado
```

### Container morre imediatamente

Verificar logs:
```bash
docker logs <id>
```

Causas comuns:
- Arquivo .env faltando
- Porta indisponível
- Erro no build

## Monitoramento

### Health checks

```bash
# Backend
curl http://localhost:3001/health

# Frontend
curl http://localhost:3000
```

### Usar Portainer (UI Docker)

```bash
docker run -d -p 8000:8000 -p 9000:9000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  portainer/portainer-ce
```

Acesse: http://localhost:9000

## Próximos passos

1. Configurar CI/CD para automatic deployment
2. Implementar database persistente (PostgreSQL)
3. Adicionar cache (Redis)
4. Configurar monitoring (Prometheus)
5. Usar Kubernetes para scale

## Referências

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Heroku Node Buildpack](https://github.com/heroku/heroku-buildpack-nodejs)
- [AWS App Runner](https://docs.aws.amazon.com/apprunner/)
