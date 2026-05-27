/**
 * Serviço de Busca e Filtros
 * Funcionalidades de pesquisa em produtos
 */

import { Produto } from '../models/Produto';
import { repositorioProdutos } from './ProdutoService';

export interface FiltrosProduto {
  busca?: string;
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  ativo?: boolean;
}

export interface ResultadoBusca {
  produtos: Produto[];
  total: number;
  filtrosAplicados: FiltrosProduto;
}

/**
 * Busca e filtra produtos
 */
export async function buscarProdutos(filtros: FiltrosProduto): Promise<ResultadoBusca> {
  const resultado = await repositorioProdutos.listarComConsulta(filtros);

  return {
    produtos: resultado.produtos,
    total: resultado.total,
    filtrosAplicados: filtros,
  };
}

/**
 * Obtém categorias únicas
 */
export async function obterCategorias(): Promise<string[]> {
  const produtos = await repositorioProdutos.listar();
  const categorias = new Set(produtos.map(p => p.category));
  return Array.from(categorias).sort();
}

/**
 * Obtém estatísticas dos produtos
 */
export async function obterEstatisticas() {
  const produtos = await repositorioProdutos.listar();

  if (produtos.length === 0) {
    return {
      total: 0,
      ativos: 0,
      inativos: 0,
      precoMedio: 0,
      precoMin: 0,
      precoMax: 0,
      categorias: 0,
    };
  }

  const ativos = produtos.filter(p => p.active).length;
  const inativos = produtos.length - ativos;
  const precos = produtos.map(p => p.price);
  const precoMedio = precos.reduce((a, b) => a + b, 0) / produtos.length;
  const precoMin = Math.min(...precos);
  const precoMax = Math.max(...precos);
  const categorias = new Set(produtos.map(p => p.category)).size;

  return {
    total: produtos.length,
    ativos,
    inativos,
    precoMedio: parseFloat(precoMedio.toFixed(2)),
    precoMin,
    precoMax,
    categorias,
  };
}
