/**
 * Testes da Service de Produtos
 */

import { prisma } from '../database/prisma';
import { Produto } from '../models/Produto';
import { repositorioProdutos } from '../services/ProdutoService';

jest.mock('../database/prisma', () => ({
  prisma: {
    produto: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}));

const prismaMock = prisma as unknown as {
  produto: {
    findMany: jest.Mock;
    findUnique: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  $disconnect: jest.Mock;
};

function criarProdutoMock(overrides: Partial<Produto> = {}): Produto {
  return {
    id: 1,
    name: 'Produto teste',
    description: 'Descrição do produto teste',
    price: 100,
    category: 'Testes',
    active: true,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

describe('RepositorioProdutos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('criar', () => {
    it('deve criar um novo produto', async () => {
      const novoProduto = criarProdutoMock();
      prismaMock.produto.create.mockResolvedValue(novoProduto);

      const resultado = await repositorioProdutos.criar({
        name: 'Produto teste',
        description: 'Descrição do produto teste',
        price: 100,
        category: 'Testes',
        active: true,
      });

      expect(prismaMock.produto.create).toHaveBeenCalledWith({
        data: {
          name: 'Produto teste',
          description: 'Descrição do produto teste',
          price: 100,
          category: 'Testes',
          active: true,
        },
      });
      expect(resultado).toEqual(novoProduto);
    });

    it('deve retornar o produto criado com timestamps', async () => {
      const novoProduto = criarProdutoMock({ id: 2 });
      prismaMock.produto.create.mockResolvedValue(novoProduto);

      const resultado = await repositorioProdutos.criar({
        name: 'Outro produto',
        description: 'Outra descrição válida',
        price: 200,
        category: 'Cat',
        active: true,
      });

      expect(resultado.id).toBe(2);
      expect(resultado.createdAt).toBeInstanceOf(Date);
      expect(resultado.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('listar', () => {
    it('deve retornar todos os produtos ordenados por data de criação', async () => {
      const produtos = [criarProdutoMock({ id: 2 }), criarProdutoMock({ id: 1 })];
      prismaMock.produto.findMany.mockResolvedValue(produtos);

      const resultado = await repositorioProdutos.listar();

      expect(prismaMock.produto.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(resultado).toEqual(produtos);
    });
  });

  describe('listarComConsulta', () => {
    it('deve listar produtos filtrados e paginados', async () => {
      const produtos = [criarProdutoMock({ id: 3 })];
      prismaMock.produto.count.mockResolvedValue(8);
      prismaMock.produto.findMany.mockResolvedValue(produtos);

      const resultado = await repositorioProdutos.listarComConsulta({
        busca: 'note',
        categoria: 'Eletrônicos',
        precoMin: 100,
        precoMax: 5000,
        ativo: true,
        pagina: 2,
        porPagina: 1,
      });

      expect(prismaMock.produto.count).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: 'note',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: 'note',
                mode: 'insensitive',
              },
            },
          ],
          category: 'Eletrônicos',
          price: {
            gte: 100,
            lte: 5000,
          },
          active: true,
        },
      });

      expect(prismaMock.produto.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: 'note',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: 'note',
                mode: 'insensitive',
              },
            },
          ],
          category: 'Eletrônicos',
          price: {
            gte: 100,
            lte: 5000,
          },
          active: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: 1,
        take: 1,
      });

      expect(resultado.produtos).toEqual(produtos);
      expect(resultado.total).toBe(8);
      expect(resultado.paginacao).toEqual({
        paginaAtual: 2,
        porPagina: 1,
        total: 8,
        totalPaginas: 8,
        temProxima: true,
        temAnterior: true,
      });
    });

    it('deve retornar todos os produtos sem paginação quando não houver parâmetros de página', async () => {
      const produtos = [criarProdutoMock({ id: 1 }), criarProdutoMock({ id: 2 })];
      prismaMock.produto.count.mockResolvedValue(2);
      prismaMock.produto.findMany.mockResolvedValue(produtos);

      const resultado = await repositorioProdutos.listarComConsulta({
        busca: 'produto',
      });

      expect(prismaMock.produto.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              name: {
                contains: 'produto',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: 'produto',
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(resultado.paginacao).toBeNull();
      expect(resultado.total).toBe(2);
    });

    it('deve aplicar ordenação personalizada', async () => {
      const produtos = [criarProdutoMock({ id: 1 })];
      prismaMock.produto.count.mockResolvedValue(1);
      prismaMock.produto.findMany.mockResolvedValue(produtos);

      await repositorioProdutos.listarComConsulta({
        sortBy: 'price',
        sortDirection: 'asc',
      });

      expect(prismaMock.produto.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: {
          price: 'asc',
        },
      });
    });
  });

  describe('buscarPorId', () => {
    it('deve encontrar um produto pelo ID', async () => {
      const criado = criarProdutoMock();
      prismaMock.produto.findUnique.mockResolvedValue(criado);

      const encontrado = await repositorioProdutos.buscarPorId(criado.id);

      expect(prismaMock.produto.findUnique).toHaveBeenCalledWith({
        where: { id: criado.id },
      });
      expect(encontrado).toEqual(criado);
    });

    it('deve retornar null se o ID for inválido', async () => {
      const encontrado = await repositorioProdutos.buscarPorId('abc');

      expect(encontrado).toBeNull();
      expect(prismaMock.produto.findUnique).not.toHaveBeenCalled();
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um produto existente', async () => {
      const atualizado = criarProdutoMock({
        name: 'Atualizado',
        price: 200,
      });
      prismaMock.produto.update.mockResolvedValue(atualizado);

      const resultado = await repositorioProdutos.atualizar(1, {
        name: 'Atualizado',
        price: 200,
      });

      expect(prismaMock.produto.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: 'Atualizado',
          price: 200,
        },
      });
      expect(resultado).toEqual(atualizado);
    });

    it('deve retornar null se produto não existir', async () => {
      prismaMock.produto.update.mockRejectedValue(new Error('Registro não encontrado'));

      const resultado = await repositorioProdutos.atualizar(9999, {
        name: 'Novo',
      });

      expect(resultado).toBeNull();
    });

    it('deve retornar null se o ID for inválido', async () => {
      const resultado = await repositorioProdutos.atualizar('abc', {
        name: 'Novo',
      });

      expect(resultado).toBeNull();
      expect(prismaMock.produto.update).not.toHaveBeenCalled();
    });
  });

  describe('remover', () => {
    it('deve remover um produto existente', async () => {
      prismaMock.produto.delete.mockResolvedValue({} as never);

      const removido = await repositorioProdutos.remover(1);

      expect(prismaMock.produto.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(removido).toBe(true);
    });

    it('deve retornar false se produto não existir', async () => {
      prismaMock.produto.delete.mockRejectedValue(new Error('Registro não encontrado'));

      const removido = await repositorioProdutos.remover(9999);

      expect(removido).toBe(false);
    });

    it('deve retornar false se o ID for inválido', async () => {
      const removido = await repositorioProdutos.remover('abc');

      expect(removido).toBe(false);
      expect(prismaMock.produto.delete).not.toHaveBeenCalled();
    });
  });

  describe('contar', () => {
    it('deve retornar a quantidade total de produtos', async () => {
      prismaMock.produto.count.mockResolvedValue(3);

      const total = await repositorioProdutos.contar();

      expect(total).toBe(3);
    });
  });
});
