/**
 * Controlador de Produtos
 * Trata as requisições HTTP relacionadas a produtos
 */

import { Request, Response } from 'express';
import { DirecaoOrdenacao, OrdenacaoProdutoCampo, repositorioProdutos } from '../services/ProdutoService';
import { validarCriacaoProduto, validarAtualizacaoProduto } from '../services/ValidacaoService';

function lerTexto(valor: unknown): string | undefined {
  if (typeof valor !== 'string') {
    return undefined;
  }

  const texto = valor.trim();
  return texto.length > 0 ? texto : undefined;
}

function lerNumero(valor: unknown): number | undefined {
  if (typeof valor !== 'string') {
    return undefined;
  }

  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : undefined;
}

function lerBooleano(valor: unknown): boolean | undefined {
  if (typeof valor !== 'string') {
    return undefined;
  }

  const normalizado = valor.trim().toLowerCase();

  if (['true', '1', 'sim', 's'].includes(normalizado)) {
    return true;
  }

  if (['false', '0', 'nao', 'não', 'n'].includes(normalizado)) {
    return false;
  }

  return undefined;
}

function lerOrdenacaoCampo(valor: unknown): OrdenacaoProdutoCampo | undefined {
  if (typeof valor !== 'string') {
    return undefined;
  }

  const normalizado = valor.trim();
  const camposValidos: OrdenacaoProdutoCampo[] = [
    'name',
    'price',
    'category',
    'active',
    'createdAt',
    'updatedAt',
  ];

  return camposValidos.includes(normalizado as OrdenacaoProdutoCampo)
    ? (normalizado as OrdenacaoProdutoCampo)
    : undefined;
}

function lerDirecaoOrdenacao(valor: unknown): DirecaoOrdenacao | undefined {
  if (typeof valor !== 'string') {
    return undefined;
  }

  const normalizado = valor.trim().toLowerCase();
  if (normalizado === 'asc' || normalizado === 'desc') {
    return normalizado;
  }

  return undefined;
}

/**
 * GET /produtos
 * Lista produtos com filtros e paginação opcionais
 */
export async function listarProdutos(req: Request, res: Response): Promise<void> {
  try {
    const pagina = lerNumero(req.query.pagina);
    const porPagina = lerNumero(req.query.porPagina);
    const busca = lerTexto(req.query.busca);
    const categoria = lerTexto(req.query.categoria);
    const precoMin = lerNumero(req.query.precoMin);
    const precoMax = lerNumero(req.query.precoMax);
    const ativo = lerBooleano(req.query.ativo);
    const sortBy = lerOrdenacaoCampo(req.query.sortBy);
    const sortDirection = lerDirecaoOrdenacao(req.query.sortDirection);

    const possuiConsulta = [
      pagina,
      porPagina,
      busca,
      categoria,
      precoMin,
      precoMax,
      ativo,
      sortBy,
      sortDirection,
    ].some(valor => valor !== undefined);

    const resultado = await repositorioProdutos.listarComConsulta(
      possuiConsulta
        ? {
            pagina,
            porPagina,
            busca,
            categoria,
            precoMin,
            precoMax,
            ativo,
            sortBy,
            sortDirection,
          }
        : {}
    );

    res.status(200).json({
      sucesso: true,
      dados: resultado.produtos,
      total: resultado.total,
      paginacao: resultado.paginacao,
      filtrosAplicados: resultado.filtrosAplicados,
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
export async function obterProduto(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const produto = await repositorioProdutos.buscarPorId(isNaN(Number(id)) ? id : Number(id));

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
export async function criarProduto(req: Request, res: Response): Promise<void> {
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

    const novoProduto = await repositorioProdutos.criar(req.body);

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
export async function atualizarProduto(req: Request, res: Response): Promise<void> {
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

    const produtoAtualizado = await repositorioProdutos.atualizar(
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
export async function removerProduto(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const removido = await repositorioProdutos.remover(isNaN(Number(id)) ? id : Number(id));

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
