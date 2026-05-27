/**
 * Tipos de Produto
 * Define interfaces TypeScript para o produto
 */

export interface Produto {
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type CriarProduto = Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>;
export type AtualizarProduto = Partial<CriarProduto>;
