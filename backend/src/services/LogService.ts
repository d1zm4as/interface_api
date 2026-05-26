/**
 * Serviço de Log
 * Centraliza o logging da aplicação
 */

enum NivelLog {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class ServicoLog {
  private prefix = '[API Produtos]';

  /**
   * Log de informação
   */
  info(mensagem: string, dados?: any): void {
    console.log(
      `${this.prefix} [${NivelLog.INFO}] ${mensagem}`,
      dados ? dados : ''
    );
  }

  /**
   * Log de aviso
   */
  warn(mensagem: string, dados?: any): void {
    console.warn(
      `${this.prefix} [${NivelLog.WARN}] ${mensagem}`,
      dados ? dados : ''
    );
  }

  /**
   * Log de erro
   */
  error(mensagem: string, erro?: Error | any): void {
    console.error(`${this.prefix} [${NivelLog.ERROR}] ${mensagem}`, erro);
  }

  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug(mensagem: string, dados?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(
        `${this.prefix} [${NivelLog.DEBUG}] ${mensagem}`,
        dados ? dados : ''
      );
    }
  }

  /**
   * Log de requisição HTTP
   */
  requisicao(metodo: string, rota: string, statusCode?: number): void {
    const status = statusCode ? ` → ${statusCode}` : '';
    this.info(`${metodo} ${rota}${status}`);
  }
}

// Exporta singleton
export const logger = new ServicoLog();
