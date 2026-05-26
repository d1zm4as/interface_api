/**
 * Middleware de Autenticação Simples
 * Valida headers da requisição
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar Content-Type
 */
export function validarContentType(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (['POST', 'PUT'].includes(req.method)) {
    if (!req.is('application/json')) {
      res.status(400).json({
        sucesso: false,
        mensagem: 'Content-Type deve ser application/json',
      });
      return;
    }
  }
  next();
}

/**
 * Middleware para adicionar headers de segurança
 */
export function adicionarHeadersSeguranca(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

/**
 * Middleware para logging de requisições
 */
export function middlewareLog(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const inicio = Date.now();
  
  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duracao}ms)`);
  });

  next();
}
