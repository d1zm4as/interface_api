/**
 * Serviço de Produtos com PostgreSQL + Prisma
 * Gerencia a persistência e a lógica de negócio dos produtos
 */

import { Produto, CriarProduto, AtualizarProduto } from '../models/Produto';
import { prisma } from '../database/prisma';

function normalizarId(id: string | number): number | null {
  const valor = typeof id === 'number' ? id : Number(id);
  return Number.isNaN(valor) ? null : valor;
}

export interface FiltrosListagemProdutos {
  pagina?: number;
  porPagina?: number;
  busca?: string;
  categoria?: string;
  precoMin?: number;
  precoMax?: number;
  ativo?: boolean;
  sortBy?: OrdenacaoProdutoCampo;
  sortDirection?: DirecaoOrdenacao;
}

export type OrdenacaoProdutoCampo =
  | 'name'
  | 'price'
  | 'category'
  | 'active'
  | 'createdAt'
  | 'updatedAt';

export type DirecaoOrdenacao = 'asc' | 'desc';

export interface PaginacaoProdutos {
  paginaAtual: number;
  porPagina: number;
  total: number;
  totalPaginas: number;
  temProxima: boolean;
  temAnterior: boolean;
}

export interface ResultadoListagemProdutos {
  produtos: Produto[];
  total: number;
  paginacao: PaginacaoProdutos | null;
  filtrosAplicados: FiltrosListagemProdutos;
}

class RepositorioProdutos {
  /**
   * Lista todos os produtos
   */
  async listar(): Promise<Produto[]> {
    return await prisma.produto.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  /**
   * Lista produtos com filtros opcionais e paginação
   */
  async listarComConsulta(
    filtros: FiltrosListagemProdutos = {}
  ): Promise<ResultadoListagemProdutos> {
    const where: any = {};

    if (filtros.busca) {
      where.OR = [
        {
          name: {
            contains: filtros.busca,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filtros.busca,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (filtros.categoria) {
      where.category = filtros.categoria;
    }

    if (filtros.precoMin !== undefined || filtros.precoMax !== undefined) {
      where.price = {};

      if (filtros.precoMin !== undefined) {
        where.price.gte = filtros.precoMin;
      }

      if (filtros.precoMax !== undefined) {
        where.price.lte = filtros.precoMax;
      }
    }

    if (filtros.ativo !== undefined) {
      where.active = filtros.ativo;
    }

    const campoOrdenacao: OrdenacaoProdutoCampo = [
      'name',
      'price',
      'category',
      'active',
      'createdAt',
      'updatedAt',
    ].includes(filtros.sortBy ?? '')
      ? (filtros.sortBy as OrdenacaoProdutoCampo)
      : 'createdAt';
    const direcaoOrdenacao: DirecaoOrdenacao = filtros.sortDirection === 'asc' ? 'asc' : 'desc';

    const total = await prisma.produto.count({ where });

    const aplicarPaginacao = filtros.pagina !== undefined || filtros.porPagina !== undefined;
    const paginaAtual = Math.max(1, filtros.pagina ?? 1);
    const porPagina = aplicarPaginacao
      ? Math.max(1, Math.min(filtros.porPagina ?? 10, 100))
      : total > 0
        ? total
        : 1;

    const produtos = await prisma.produto.findMany({
      where,
      orderBy: {
        [campoOrdenacao]: direcaoOrdenacao,
      },
      ...(aplicarPaginacao
        ? {
            skip: (paginaAtual - 1) * porPagina,
            take: porPagina,
          }
        : {}),
    });

    const totalPaginas = aplicarPaginacao
      ? Math.ceil(total / porPagina)
      : total > 0
        ? 1
        : 0;

    return {
      produtos,
      total,
      paginacao: aplicarPaginacao
        ? {
            paginaAtual,
            porPagina,
            total,
            totalPaginas,
            temProxima: paginaAtual < totalPaginas,
            temAnterior: paginaAtual > 1,
          }
        : null,
      filtrosAplicados: filtros,
    };
  }

  /**
   * Busca um produto pelo ID
   */
  async buscarPorId(id: string | number): Promise<Produto | null> {
    const idNormalizado = normalizarId(id);

    if (idNormalizado === null) {
      return null;
    }

    return await prisma.produto.findUnique({
      where: { id: idNormalizado }
    });
  }

  /**
   * Cria um novo produto
   */
  async criar(dados: CriarProduto): Promise<Produto> {
    return await prisma.produto.create({
      data: {
        name: dados.name,
        description: dados.description,
        price: dados.price,
        category: dados.category,
        active: dados.active
      }
    });
  }

  /**
   * Atualiza um produto existente
   */
  async atualizar(id: string | number, dados: AtualizarProduto): Promise<Produto | null> {
    const idNormalizado = normalizarId(id);

    if (idNormalizado === null) {
      return null;
    }

    try {
      return await prisma.produto.update({
        where: { id: idNormalizado },
        data: dados
      });
    } catch (error) {
      return null;
    }
  }

  /**
   * Remove um produto
   */
  async remover(id: string | number): Promise<boolean> {
    const idNormalizado = normalizarId(id);

    if (idNormalizado === null) {
      return false;
    }

    try {
      await prisma.produto.delete({
        where: { id: idNormalizado }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtém a contagem total de produtos
   */
  async contar(): Promise<number> {
    return await prisma.produto.count();
  }

  /**
   * Fecha a conexão com o banco de dados
   */
  async desconectar(): Promise<void> {
    await prisma.$disconnect();
  }
}

// Exporta uma única instância do repositório
export const repositorioProdutos = new RepositorioProdutos();
