/**
 * Serviço de Produtos
 * Gerencia a lógica de negócio dos produtos
 */

import { Produto, CriarProduto, AtualizarProduto } from '../models/Produto';

class RepositorioProdutos {
  private produtos: Produto[] = [];
  private proximoId: number = 1;

  /**
   * Lista todos os produtos
   */
  listar(): Produto[] {
    return [...this.produtos];
  }

  /**
   * Busca um produto pelo ID
   */
  buscarPorId(id: string | number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  /**
   * Cria um novo produto
   */
  criar(dados: CriarProduto): Produto {
    const novoProduto: Produto = {
      id: this.proximoId++,
      ...dados,
      createdAt: new Date().toISOString(),
    };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  /**
   * Atualiza um produto existente
   */
  atualizar(id: string | number, dados: AtualizarProduto): Produto | null {
    const indice = this.produtos.findIndex(p => p.id === id);
    if (indice === -1) return null;

    this.produtos[indice] = {
      ...this.produtos[indice],
      ...dados,
    };
    return this.produtos[indice];
  }

  /**
   * Remove um produto
   */
  remover(id: string | number): boolean {
    const indice = this.produtos.findIndex(p => p.id === id);
    if (indice === -1) return false;

    this.produtos.splice(indice, 1);
    return true;
  }
}

// Exporta uma única instância do repositório
export const repositorioProdutos = new RepositorioProdutos();
