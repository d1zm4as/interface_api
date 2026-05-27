/**
 * Aplicação Principal
 * Configuração do servidor Express
 */

import express from 'express';
import cors from 'cors';
import rotasProdutos from './routes/produtos';
import {
  adicionarHeadersSeguranca,
  middlewareLog,
  validarContentType,
} from './middlewares/validacao';
import { conectarBanco, desconectarBanco } from './database/prisma';

const app = express();
const PORTA = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(adicionarHeadersSeguranca);
app.use(middlewareLog);
app.use(validarContentType);

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    mensagem: 'API de produtos em execução',
    endpoints: {
      health: '/health',
      produtos: '/produtos',
      products: '/products',
    },
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Rotas da API
app.use('/produtos', rotasProdutos);
app.use('/products', rotasProdutos);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
  });
});

async function iniciarServidor(): Promise<void> {
  try {
    await conectarBanco();

    app.listen(PORTA, () => {
      console.log(`🚀 Servidor iniciado na porta ${PORTA}`);
      console.log(`📍 http://localhost:${PORTA}`);
    });
  } catch (erro) {
    console.error('Falha ao iniciar o servidor:', erro);
    process.exit(1);
  }
}

async function encerrarAplicacao(): Promise<void> {
  await desconectarBanco();
  process.exit(0);
}

process.once('SIGINT', () => {
  void encerrarAplicacao();
});

process.once('SIGTERM', () => {
  void encerrarAplicacao();
});

if (require.main === module) {
  void iniciarServidor();
}

export default app;
export { iniciarServidor };
