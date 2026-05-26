/**
 * Testes da Service de Validação
 */

import { validarCriacaoProduto, validarAtualizacaoProduto } from '../../services/ValidacaoService';

describe('ValidacaoService', () => {
  describe('validarCriacaoProduto', () => {
    it('deve validar um produto válido', () => {
      const dadosValidos = {
        name: 'Notebook',
        description: 'Descrição do notebook',
        price: 2500.00,
        category: 'Eletrônicos',
        active: true,
      };

      const resultado = validarCriacaoProduto(dadosValidos);
      expect(resultado.valido).toBe(true);
      expect(resultado.erros).toHaveLength(0);
    });

    it('deve rejeitar produto sem nome', () => {
      const dadosInvalidos = {
        name: '',
        description: 'Descrição',
        price: 100,
        category: 'Teste',
        active: true,
      };

      const resultado = validarCriacaoProduto(dadosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Nome é obrigatório e deve ser uma string não vazia');
    });

    it('deve rejeitar preço negativo', () => {
      const dadosInvalidos = {
        name: 'Produto',
        description: 'Descrição',
        price: -100,
        category: 'Teste',
        active: true,
      };

      const resultado = validarCriacaoProduto(dadosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Preço é obrigatório e deve ser um número maior ou igual a 0');
    });

    it('deve rejeitar ativo não booleano', () => {
      const dadosInvalidos = {
        name: 'Produto',
        description: 'Descrição',
        price: 100,
        category: 'Teste',
        active: 'sim',
      };

      const resultado = validarCriacaoProduto(dadosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Status ativo é obrigatório e deve ser um booleano');
    });

    it('deve retornar múltiplos erros', () => {
      const dadosInvalidos = {
        name: '',
        description: '',
        price: -50,
        category: '',
        active: 'não',
      };

      const resultado = validarCriacaoProduto(dadosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.erros.length).toBeGreaterThan(1);
    });
  });

  describe('validarAtualizacaoProduto', () => {
    it('deve aceitar atualização parcial válida', () => {
      const dadosValidos = {
        name: 'Novo Nome',
        price: 3000,
      };

      const resultado = validarAtualizacaoProduto(dadosValidos);
      expect(resultado.valido).toBe(true);
      expect(resultado.erros).toHaveLength(0);
    });

    it('deve aceitar objeto vazio', () => {
      const dadosValidos = {};

      const resultado = validarAtualizacaoProduto(dadosValidos);
      expect(resultado.valido).toBe(true);
      expect(resultado.erros).toHaveLength(0);
    });

    it('deve rejeitar preço negativo em atualização', () => {
      const dadosInvalidos = {
        price: -100,
      };

      const resultado = validarAtualizacaoProduto(dadosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Preço deve ser um número maior ou igual a 0');
    });

    it('deve rejeitar nome vazio em atualização', () => {
      const dadosInvalidos = {
        name: '',
      };

      const resultado = validarAtualizacaoProduto(dadosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.erros).toContain('Nome deve ser uma string não vazia');
    });
  });
});
