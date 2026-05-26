/**
 * Constantes de Configuração
 */

// Mensagens de Erro
export const MENSAGENS_ERRO = {
  REDE: 'Erro de conexão com o servidor. Verifique sua internet.',
  SERVIDOR: 'Erro no servidor. Tente novamente mais tarde.',
  VALIDACAO: 'Verifique os dados informados.',
  PRODUTO_NAO_ENCONTRADO: 'Produto não encontrado.',
  CRIAR_PRODUTO: 'Erro ao criar produto.',
  ATUALIZAR_PRODUTO: 'Erro ao atualizar produto.',
  REMOVER_PRODUTO: 'Erro ao remover produto.',
  LISTAR_PRODUTOS: 'Erro ao carregar produtos.',
};

// Mensagens de Sucesso
export const MENSAGENS_SUCESSO = {
  CRIAR_PRODUTO: 'Produto criado com sucesso!',
  ATUALIZAR_PRODUTO: 'Produto atualizado com sucesso!',
  REMOVER_PRODUTO: 'Produto removido com sucesso!',
};

// Textos de Confirmação
export const CONFIRMACOES = {
  REMOVER_PRODUTO: 'Tem certeza que deseja remover este produto?',
  DESCARTAR_MUDANCAS: 'Tem certeza que deseja descartar as mudanças?',
};

// Categorias Padrão
export const CATEGORIAS_PADRAO = [
  'Eletrônicos',
  'Periféricos',
  'Acessórios',
  'Livros',
  'Roupas',
  'Alimentos',
  'Casa',
  'Esportes',
  'Brinquedos',
  'Outros',
];

// Validações
export const VALIDACOES = {
  NOME_MIN: 3,
  NOME_MAX: 100,
  DESCRICAO_MIN: 10,
  DESCRICAO_MAX: 500,
  PRECO_MIN: 0.01,
  PRECO_MAX: 999999.99,
  CATEGORIA_MIN: 2,
  CATEGORIA_MAX: 50,
};
