/**
 * Aplicação Principal
 * Configuração do servidor Express
 */

import express from 'express';
import cors from 'cors';
import rotasProdutos from './routes/produtos';

const app = express();
const PORTA = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Rotas da API
app.use('/produtos', rotasProdutos);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
  });
});

// Inicia o servidor
app.listen(PORTA, () => {
  console.log(`🚀 Servidor iniciado na porta ${PORTA}`);
  console.log(`📍 http://localhost:${PORTA}`);
});

export default app;
