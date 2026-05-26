/**
 * Validação com Zod
 * Schemas para validar dados com type safety
 */

import { z } from 'zod';

/**
 * Schema para criar um novo produto
 */
export const SchemaCriarProduto = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres'),
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição não pode ter mais de 500 caracteres'),
  price: z
    .number()
    .positive('Preço deve ser maior que 0')
    .max(999999.99, 'Preço máximo permitido é 999.999,99'),
  category: z
    .string()
    .min(2, 'Categoria deve ter pelo menos 2 caracteres')
    .max(50, 'Categoria não pode ter mais de 50 caracteres'),
  active: z
    .boolean()
    .default(true),
});

export type CriarProdutoZod = z.infer<typeof SchemaCriarProduto>;

/**
 * Schema para atualizar um produto
 */
export const SchemaAtualizarProduto = SchemaCriarProduto.partial();

export type AtualizarProdutoZod = z.infer<typeof SchemaAtualizarProduto>;

/**
 * Função para validar criação de produto
 */
export function validarComZod(dados: unknown) {
  try {
    const validado = SchemaCriarProduto.parse(dados);
    return { valido: true, dados: validado, erros: [] };
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      const erros = erro.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      return { valido: false, dados: null, erros };
    }
    return { valido: false, dados: null, erros: ['Erro desconhecido na validação'] };
  }
}

/**
 * Função para validar atualização de produto
 */
export function validarAtualizacaoComZod(dados: unknown) {
  try {
    const validado = SchemaAtualizarProduto.parse(dados);
    return { valido: true, dados: validado, erros: [] };
  } catch (erro) {
    if (erro instanceof z.ZodError) {
      const erros = erro.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      return { valido: false, dados: null, erros };
    }
    return { valido: false, dados: null, erros: ['Erro desconhecido na validação'] };
  }
}
