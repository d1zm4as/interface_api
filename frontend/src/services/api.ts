/**
 * Serviço de API de Produtos
 * Centraliza todas as chamadas HTTP para a API
 */

import axios from 'axios';
import { Produto, CriarProduto, AtualizarProduto } from '../types/Produto';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/produtos`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Lista todos os produtos
 */
export const listarProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await api.get('/');
    return response.data.dados || [];
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    throw erro;
  }
};

/**
 * Obtém um produto específico pelo ID
 */
export const obterProduto = async (id: string | number): Promise<Produto> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data.dados;
  } catch (erro) {
    console.error(`Erro ao obter produto ${id}:`, erro);
    throw erro;
  }
};

/**
 * Cria um novo produto
 */
export const criarProduto = async (dados: CriarProduto): Promise<Produto> => {
  try {
    const response = await api.post('/', dados);
    return response.data.dados;
  } catch (erro) {
    console.error('Erro ao criar produto:', erro);
    throw erro;
  }
};

/**
 * Atualiza um produto existente
 */
export const atualizarProduto = async (
  id: string | number,
  dados: AtualizarProduto
): Promise<Produto> => {
  try {
    const response = await api.put(`/${id}`, dados);
    return response.data.dados;
  } catch (erro) {
    console.error(`Erro ao atualizar produto ${id}:`, erro);
    throw erro;
  }
};

/**
 * Remove um produto
 */
export const removerProduto = async (id: string | number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (erro) {
    console.error(`Erro ao remover produto ${id}:`, erro);
    throw erro;
  }
};
