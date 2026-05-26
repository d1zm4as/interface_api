/**
 * Testes da Service de Produtos
 */

import { repositorioProdutos } from '../../services/ProdutoService';
import { Produto } from '../../models/Produto';

describe('RepositorioProdutos', () => {
  beforeEach(() => {
    // Limpa os produtos antes de cada teste
    const produtos = repositorioProdutos.listar();
    produtos.forEach(p => {
      repositorioProdutos.remover(p.id);
    });
  });

  describe('criar', () => {
    it('deve criar um novo produto', () => {
      const novoProduto = repositorioProdutos.criar({
        name: 'Teste',
        description: 'Descrição teste',
        price: 100,
        category: 'Testes',
        active: true,
      });

      expect(novoProduto).toHaveProperty('id');
      expect(novoProduto.name).toBe('Teste');
      expect(novoProduto.price).toBe(100);
      expect(novoProduto).toHaveProperty('createdAt');
    });

    it('deve incrementar o ID automaticamente', () => {
      const produto1 = repositorioProdutos.criar({
        name: 'Produto 1',
        description: 'Desc 1',
        price: 100,
        category: 'Cat',
        active: true,
      });

      const produto2 = repositorioProdutos.criar({
        name: 'Produto 2',
        description: 'Desc 2',
        price: 200,
        category: 'Cat',
        active: true,
      });

      expect(Number(produto2.id)).toBeGreaterThan(Number(produto1.id));
    });
  });

  describe('listar', () => {
    it('deve retornar array vazio inicialmente', () => {
      const produtos = repositorioProdutos.listar();
      expect(Array.isArray(produtos)).toBe(true);
      expect(produtos.length).toBe(0);
    });

    it('deve retornar todos os produtos criados', () => {
      repositorioProdutos.criar({
        name: 'P1',
        description: 'D1',
        price: 100,
        category: 'C',
        active: true,
      });

      repositorioProdutos.criar({
        name: 'P2',
        description: 'D2',
        price: 200,
        category: 'C',
        active: true,
      });

      const produtos = repositorioProdutos.listar();
      expect(produtos.length).toBe(2);
    });
  });

  describe('buscarPorId', () => {
    it('deve encontrar um produto pelo ID', () => {
      const criado = repositorioProdutos.criar({
        name: 'Teste',
        description: 'Desc',
        price: 100,
        category: 'Cat',
        active: true,
      });

      const encontrado = repositorioProdutos.buscarPorId(criado.id);
      expect(encontrado).toEqual(criado);
    });

    it('deve retornar undefined se não encontrar', () => {
      const encontrado = repositorioProdutos.buscarPorId(9999);
      expect(encontrado).toBeUndefined();
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um produto existente', () => {
      const criado = repositorioProdutos.criar({
        name: 'Original',
        description: 'Desc original',
        price: 100,
        category: 'Cat',
        active: true,
      });

      const atualizado = repositorioProdutos.atualizar(criado.id, {
        name: 'Atualizado',
        price: 200,
      });

      expect(atualizado).not.toBeNull();
      expect(atualizado?.name).toBe('Atualizado');
      expect(atualizado?.price).toBe(200);
      expect(atualizado?.description).toBe('Desc original');
    });

    it('deve retornar null se produto não existir', () => {
      const resultado = repositorioProdutos.atualizar(9999, {
        name: 'Novo',
      });

      expect(resultado).toBeNull();
    });
  });

  describe('remover', () => {
    it('deve remover um produto existente', () => {
      const criado = repositorioProdutos.criar({
        name: 'Para remover',
        description: 'Desc',
        price: 100,
        category: 'Cat',
        active: true,
      });

      const removido = repositorioProdutos.remover(criado.id);
      expect(removido).toBe(true);

      const buscado = repositorioProdutos.buscarPorId(criado.id);
      expect(buscado).toBeUndefined();
    });

    it('deve retornar false se produto não existir', () => {
      const removido = repositorioProdutos.remover(9999);
      expect(removido).toBe(false);
    });
  });
});
