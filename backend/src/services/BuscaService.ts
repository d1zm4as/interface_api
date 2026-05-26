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
export function buscarProdutos(filtros: FiltrosProduto): ResultadoBusca {
  let produtos = repositorioProdutos.listar();

  // Filtro por busca (nome ou descrição)
  if (filtros.busca) {
    const termo = filtros.busca.toLowerCase();
    produtos = produtos.filter(
      p =>
        p.name.toLowerCase().includes(termo) ||
        p.description.toLowerCase().includes(termo)
    );
  }

  // Filtro por categoria
  if (filtros.categoria) {
    produtos = produtos.filter(p => p.category === filtros.categoria);
  }

  // Filtro por faixa de preço
  if (filtros.precoMin !== undefined) {
    produtos = produtos.filter(p => p.price >= filtros.precoMin!);
  }

  if (filtros.precoMax !== undefined) {
    produtos = produtos.filter(p => p.price <= filtros.precoMax!);
  }

  // Filtro por status ativo
  if (filtros.ativo !== undefined) {
    produtos = produtos.filter(p => p.active === filtros.ativo);
  }

  return {
    produtos,
    total: produtos.length,
    filtrosAplicados: filtros,
  };
}

/**
 * Obtém categorias únicas
 */
export function obterCategorias(): string[] {
  const produtos = repositorioProdutos.listar();
  const categorias = new Set(produtos.map(p => p.category));
  return Array.from(categorias).sort();
}

/**
 * Obtém estatísticas dos produtos
 */
export function obterEstatisticas() {
  const produtos = repositorioProdutos.listar();

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
