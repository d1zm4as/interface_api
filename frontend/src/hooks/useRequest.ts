/**
 * Hook Customizado para Requisições
 * Centraliza a lógica de carregamento e erro
 */

import { useState, useCallback } from 'react';

interface UseRequestState {
  carregando: boolean;
  erro: string | null;
  sucesso: boolean;
}

interface UseRequestReturn extends UseRequestState {
  executar: <T>(funcao: () => Promise<T>) => Promise<T | null>;
  limparErro: () => void;
  limparSucesso: () => void;
  resetar: () => void;
}

/**
 * Hook para gerenciar requisições HTTP
 * Exemplo de uso:
 *
 * const { carregando, erro, executar } = useRequest();
 * 
 * const handleSalvar = async () => {
 *   const resultado = await executar(() => api.criar(dados));
 *   if (resultado) { ... }
 * };
 */
export const useRequest = (): UseRequestReturn => {
  const [estado, setEstado] = useState<UseRequestState>({
    carregando: false,
    erro: null,
    sucesso: false,
  });

  /**
   * Executa uma função assíncrona com tratamento de estado
   */
  const executar = useCallback(async <T,>(
    funcao: () => Promise<T>
  ): Promise<T | null> => {
    setEstado({ carregando: true, erro: null, sucesso: false });

    try {
      const resultado = await funcao();
      setEstado({ carregando: false, erro: null, sucesso: true });
      
      // Remove mensagem de sucesso após 3 segundos
      const timer = setTimeout(() => {
        setEstado(prev => ({ ...prev, sucesso: false }));
      }, 3000);

      return () => clearTimeout(timer);
      return resultado;
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido';
      setEstado({ carregando: false, erro: mensagem, sucesso: false });
      return null;
    }
  }, []);

  /**
   * Limpa a mensagem de erro
   */
  const limparErro = useCallback(() => {
    setEstado(prev => ({ ...prev, erro: null }));
  }, []);

  /**
   * Limpa a mensagem de sucesso
   */
  const limparSucesso = useCallback(() => {
    setEstado(prev => ({ ...prev, sucesso: false }));
  }, []);

  /**
   * Reseta todos os estados
   */
  const resetar = useCallback(() => {
    setEstado({ carregando: false, erro: null, sucesso: false });
  }, []);

  return {
    ...estado,
    executar,
    limparErro,
    limparSucesso,
    resetar,
  };
};

export default useRequest;
