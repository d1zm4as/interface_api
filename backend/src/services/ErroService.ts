/**
 * Tipos de Erro Customizados
 */

export class ErroAPI extends Error {
  constructor(
    public statusCode: number,
    public mensagem: string,
    public erros?: string[]
  ) {
    super(mensagem);
    this.name = 'ErroAPI';
    Object.setPrototypeOf(this, ErroAPI.prototype);
  }
}

export class ErroValidacao extends ErroAPI {
  constructor(erros: string[]) {
    super(400, 'Dados de entrada inválidos', erros);
    this.name = 'ErroValidacao';
    Object.setPrototypeOf(this, ErroValidacao.prototype);
  }
}

export class ErroNaoEncontrado extends ErroAPI {
  constructor(recurso: string = 'Recurso') {
    super(404, `${recurso} não encontrado`);
    this.name = 'ErroNaoEncontrado';
    Object.setPrototypeOf(this, ErroNaoEncontrado.prototype);
  }
}

export class ErroInterno extends ErroAPI {
  constructor(mensagem: string = 'Erro interno do servidor') {
    super(500, mensagem);
    this.name = 'ErroInterno';
    Object.setPrototypeOf(this, ErroInterno.prototype);
  }
}

export class ErroConflito extends ErroAPI {
  constructor(mensagem: string = 'Conflito ao processar requisição') {
    super(409, mensagem);
    this.name = 'ErroConflito';
    Object.setPrototypeOf(this, ErroConflito.prototype);
  }
}
