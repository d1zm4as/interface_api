/**
 * Serviço de Paginação
 * Funcionalidades de paginação de produtos
 */

import { Produto } from '../models/Produto';
import { repositorioProdutos } from './ProdutoService';

export interface OpcoesP aginacao {
  pagina: number;
  porPagina: number;
}

export interface ResultadoPaginado<T> {
  dados: T[];
  paginacao: {
    paginaAtual: number;
    porPagina: number;
    total: number;
    totalPaginas: number;
    temProxima: boolean;
    temAnterior: boolean;
  };
}

/**
 * Pagina um array de itens
 */
export function paginar<T>(
  itens: T[],
  opcoes: OpcoesP aginacao
): ResultadoPaginado<T> {
  const { pagina, porPagina } = opcoes;

  // Validações
  const paginaAtual = Math.max(1, pagina);
  const porPaginaValido = Math.max(1, Math.min(porPagina, 100));

  const indiceInicio = (paginaAtual - 1) * porPaginaValido;
  const indiceFim = indiceInicio + porPaginaValido;

  const dados = itens.slice(indiceInicio, indiceFim);
  const total = itens.length;
  const totalPaginas = Math.ceil(total / porPaginaValido);

  return {
    dados,
    paginacao: {
      paginaAtual,
      porPagina: porPaginaValido,
      total,
      totalPaginas,
      temProxima: paginaAtual < totalPaginas,
      temAnterior: paginaAtual > 1,
    },
  };
}

/**
 * Obtém produtos paginados
 */
export function obterProdutosPaginados(
  opcoes: OpcoesP aginacao
): ResultadoPaginado<Produto> {
  const produtos = repositorioProdutos.listar();
  return paginar(produtos, opcoes);
}

/**
 * Valida opções de paginação
 */
export function validarOpcoesPaginacao(
  pagina: any,
  porPagina: any
): OpcoesP aginacao {
  const p = Math.max(1, parseInt(pagina) || 1);
  const pp = Math.max(1, Math.min(parseInt(porPagina) || 10, 100));

  return {
    pagina: p,
    porPagina: pp,
  };
}
