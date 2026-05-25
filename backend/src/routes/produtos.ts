/**
 * Rotas de Produtos
 * Define os endpoints da API
 */

import { Router } from 'express';
import {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  removerProduto,
} from '../controllers/ProdutoController';

const rotasProdutos = Router();

// GET /produtos - Lista todos os produtos
rotasProdutos.get('/', listarProdutos);

// GET /produtos/:id - Obtém um produto específico
rotasProdutos.get('/:id', obterProduto);

// POST /produtos - Cria um novo produto
rotasProdutos.post('/', criarProduto);

// PUT /produtos/:id - Atualiza um produto
rotasProdutos.put('/:id', atualizarProduto);

// DELETE /produtos/:id - Remove um produto
rotasProdutos.delete('/:id', removerProduto);

export default rotasProdutos;
