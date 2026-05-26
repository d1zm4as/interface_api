/**
 * Tipos de Resposta HTTP
 * Define a estrutura padrão de respostas da API
 */

export interface RespostaSucesso<T> {
  sucesso: true;
  dados?: T;
  mensagem?: string;
  total?: number;
}

export interface RespostaErro {
  sucesso: false;
  mensagem: string;
  erros?: string[];
  codigo?: string;
}

export type RespostaAPI<T> = RespostaSucesso<T> | RespostaErro;

/**
 * Tipos de Erro da API
 */
export class ErroAPI extends Error {
  constructor(
    public statusCode: number,
    public mensagem: string,
    public erros?: string[]
  ) {
    super(mensagem);
    this.name = 'ErroAPI';
  }
}

/**
 * Tipos de Erro de Validação
 */
export interface ErroValidacao {
  campo: string;
  mensagem: string;
}
