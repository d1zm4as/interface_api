/**
 * Utilitários de Validação
 * Funções para validar dados de entrada
 */

import { CriarProduto } from '../models/Produto';

export interface ErroValidacao {
  valido: boolean;
  erros: string[];
}

/**
 * Valida os dados de um novo produto
 */
export function validarCriacaoProduto(dados: any): ErroValidacao {
  const erros: string[] = [];

  // Validar nome
  if (!dados.name || typeof dados.name !== 'string' || dados.name.trim() === '') {
    erros.push('Nome é obrigatório e deve ser uma string não vazia');
  }

  // Validar descrição
  if (!dados.description || typeof dados.description !== 'string' || dados.description.trim() === '') {
    erros.push('Descrição é obrigatória e deve ser uma string não vazia');
  }

  // Validar preço
  if (typeof dados.price !== 'number' || dados.price < 0) {
    erros.push('Preço é obrigatório e deve ser um número maior ou igual a 0');
  }

  // Validar categoria
  if (!dados.category || typeof dados.category !== 'string' || dados.category.trim() === '') {
    erros.push('Categoria é obrigatória e deve ser uma string não vazia');
  }

  // Validar status ativo
  if (typeof dados.active !== 'boolean') {
    erros.push('Status ativo é obrigatório e deve ser um booleano');
  }

  return {
    valido: erros.length === 0,
    erros,
  };
}

/**
 * Valida os dados de atualização de um produto
 */
export function validarAtualizacaoProduto(dados: any): ErroValidacao {
  const erros: string[] = [];

  // Validar nome (se informado)
  if (dados.name !== undefined && (typeof dados.name !== 'string' || dados.name.trim() === '')) {
    erros.push('Nome deve ser uma string não vazia');
  }

  // Validar descrição (se informada)
  if (dados.description !== undefined && (typeof dados.description !== 'string' || dados.description.trim() === '')) {
    erros.push('Descrição deve ser uma string não vazia');
  }

  // Validar preço (se informado)
  if (dados.price !== undefined && (typeof dados.price !== 'number' || dados.price < 0)) {
    erros.push('Preço deve ser um número maior ou igual a 0');
  }

  // Validar categoria (se informada)
  if (dados.category !== undefined && (typeof dados.category !== 'string' || dados.category.trim() === '')) {
    erros.push('Categoria deve ser uma string não vazia');
  }

  // Validar status ativo (se informado)
  if (dados.active !== undefined && typeof dados.active !== 'boolean') {
    erros.push('Status ativo deve ser um booleano');
  }

  return {
    valido: erros.length === 0,
    erros,
  };
}
