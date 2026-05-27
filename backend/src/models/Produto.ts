/**
 * Modelo de Produto
 * Define a estrutura e tipos de um produto
 */

export interface Produto {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CriarProduto = Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>;
export type AtualizarProduto = Partial<CriarProduto>;
