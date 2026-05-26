/**
 * Utilitários Comuns
 * Funções auxiliares reutilizáveis
 */

/**
 * Formata moeda para o padrão brasileiro
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

/**
 * Formata data para o padrão brasileiro
 */
export function formatarData(data: string | Date): string {
  const dataParse = typeof data === 'string' ? new Date(data) : data;
  return dataParse.toLocaleDateString('pt-BR');
}

/**
 * Gera um ID aleatório
 */
export function gerarId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Valida se uma string é um email válido
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Remove espaços em branco de uma string
 */
export function removerEspacos(texto: string): string {
  return texto.trim();
}

/**
 * Capitaliza a primeira letra de uma string
 */
export function capitalizarPrimeira(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
