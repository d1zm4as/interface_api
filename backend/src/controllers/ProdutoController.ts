/**
 * Controlador de Produtos
 * Trata as requisições HTTP relacionadas a produtos
 */

import { Request, Response } from 'express';
import { repositorioProdutos } from '../services/ProdutoService';
import { validarCriacaoProduto, validarAtualizacaoProduto } from '../services/ValidacaoService';

/**
 * GET /produtos
 * Lista todos os produtos
 */
export function listarProdutos(req: Request, res: Response): void {
  try {
    const produtos = repositorioProdutos.listar();
    res.status(200).json({
      sucesso: true,
      dados: produtos,
      total: produtos.length,
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao listar produtos',
      erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
    });
  }
}

/**
 * GET /produtos/:id
 * Busca um produto específico pelo ID
 */
export function obterProduto(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const produto = repositorioProdutos.buscarPorId(isNaN(Number(id)) ? id : Number(id));

    if (!produto) {
      res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado',
      });
      return;
    }

    res.status(200).json({
      sucesso: true,
      dados: produto,
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao obter produto',
      erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
    });
  }
}

/**
 * POST /produtos
 * Cria um novo produto
 */
export function criarProduto(req: Request, res: Response): void {
  try {
    const validacao = validarCriacaoProduto(req.body);

    if (!validacao.valido) {
      res.status(400).json({
        sucesso: false,
        mensagem: 'Dados de entrada inválidos',
        erros: validacao.erros,
      });
      return;
    }

    const novoProduto = repositorioProdutos.criar(req.body);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Produto criado com sucesso',
      dados: novoProduto,
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao criar produto',
      erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
    });
  }
}

/**
 * PUT /produtos/:id
 * Atualiza um produto existente
 */
export function atualizarProduto(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const validacao = validarAtualizacaoProduto(req.body);

    if (!validacao.valido) {
      res.status(400).json({
        sucesso: false,
        mensagem: 'Dados de entrada inválidos',
        erros: validacao.erros,
      });
      return;
    }

    const produtoAtualizado = repositorioProdutos.atualizar(
      isNaN(Number(id)) ? id : Number(id),
      req.body
    );

    if (!produtoAtualizado) {
      res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado',
      });
      return;
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Produto atualizado com sucesso',
      dados: produtoAtualizado,
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar produto',
      erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
    });
  }
}

/**
 * DELETE /produtos/:id
 * Remove um produto
 */
export function removerProduto(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const removido = repositorioProdutos.remover(isNaN(Number(id)) ? id : Number(id));

    if (!removido) {
      res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado',
      });
      return;
    }

    res.status(200).json({
      sucesso: true,
      mensagem: 'Produto removido com sucesso',
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao remover produto',
      erro: erro instanceof Error ? erro.message : 'Erro desconhecido',
    });
  }
}
