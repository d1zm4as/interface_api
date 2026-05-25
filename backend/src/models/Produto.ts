/**
 * Modelo de Produto
 * Define a estrutura e tipos de um produto
 */

export interface Produto {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: string;
}

export type CriarProduto = Omit<Produto, 'id' | 'createdAt'>;
export type AtualizarProduto = Partial<CriarProduto>;
