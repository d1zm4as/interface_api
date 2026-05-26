# 📱 Guia de Deploy

Instruções para fazer deploy do projeto em diferentes plataformas.

## 🌐 Deploy no Vercel (Frontend)

### Pré-requisitos
- Conta no Vercel (vercel.com)
- Repositório GitHub com o código

### Passos

1. **Conecte seu repositório**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure variáveis de ambiente**
   - Vá para o dashboard do Vercel
   - Projeto → Settings → Environment Variables
   - Adicione: `REACT_APP_API_URL=https://seu-backend.com`

## 🖥️ Deploy no Heroku (Backend)

### Pré-requisitos
- Conta no Heroku
- Heroku CLI instalado

### Passos

1. **Login**
   ```bash
   heroku login
   ```

2. **Crie a aplicação**
   ```bash
   cd backend
   heroku create seu-app-name
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Configure variáveis de ambiente**
   ```bash
   heroku config:set CORS_ORIGIN=https://seu-frontend.vercel.app
   heroku config:set NODE_ENV=production
   ```

5. **Visualize logs**
   ```bash
   heroku logs --tail
   ```

## 🐳 Deploy com Docker Compose

### Crie arquivo `docker-compose.yml` na raiz:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: production
      CORS_ORIGIN: http://localhost:3000
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      REACT_APP_API_URL: http://localhost:3001
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Execute:
```bash
docker-compose up
```

## ☁️ Deploy no Railway

### Pré-requisitos
- Conta no Railway (railway.app)

### Passos

1. **Conecte seu repositório GitHub**
   - Vá para railway.app
   - New Project → Deploy from GitHub

2. **Configure variáveis de ambiente**
   - Na aba Variables
   - Adicione: `NODE_ENV=production`
   - Adicione: `CORS_ORIGIN=https://seu-frontend-url`

3. **Deploy automático**
   - Qualquer push para main fará deploy automático

## 🔄 Deploy Manual em VPS (Linux/Ubuntu)

### Pré-requisitos
- VPS com Node.js 16+
- SSH acesso
- Git instalado

### Passos

1. **SSH na VPS**
   ```bash
   ssh user@ip-do-vps
   ```

2. **Clone o repositório**
   ```bash
   git clone seu-repositorio
   cd interface_api
   ```

3. **Instale dependências**
   ```bash
   cd backend && npm install && npm run build
   cd ../frontend && npm install && npm run build
   ```

4. **Use PM2 para rodar backend**
   ```bash
   npm i -g pm2
   pm2 start dist/index.js --name "api-produtos"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx**
   ```bash
   # Instale Nginx
   sudo apt install nginx
   
   # Crie config em /etc/nginx/sites-available/seu-app
   server {
     listen 80;
     server_name seu-dominio.com;

     location / {
       proxy_pass http://localhost:3001;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. **Ative o site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/seu-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🔒 Variáveis de Ambiente em Produção

### Backend
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://seu-frontend-url.com
```

### Frontend
```env
REACT_APP_API_URL=https://seu-backend-url.com
```

## ✅ Checklist de Deploy

- [ ] Todas as dependências instaladas
- [ ] TypeScript compilado sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] Banco de dados (se aplicável) configurado
- [ ] Testes passando
- [ ] Build otimizado gerado
- [ ] SSL/HTTPS configurado
- [ ] Backup do banco de dados (se existente)
- [ ] Monitoramento configurado

## 🚨 Troubleshooting

### CORS Error em produção
Verifique se `CORS_ORIGIN` no backend aponta para o URL correto do frontend.

### Timeout nas requisições
Aumente o timeout do servidor nginx/Apache e configure o timeout do axios.

### Variáveis de ambiente não funcionando
Certifique-se de reiniciar a aplicação após configurar variáveis.

### Erro 502 Bad Gateway
Verifique se o backend está rodando e acessível.

---

**Escolha o método que melhor se adequa ao seu projeto! 🚀**
