/**
 * Componente de Alerta/Notificação
 * Exibe mensagens de sucesso, erro ou aviso
 */

import React, { useEffect } from 'react';
import './Alerta.css';

type TipoAlerta = 'sucesso' | 'erro' | 'aviso' | 'info';

interface AlertaProps {
  tipo: TipoAlerta;
  mensagem: string;
  duracao?: number;
  onFechar?: () => void;
}

export const Alerta: React.FC<AlertaProps> = ({
  tipo,
  mensagem,
  duracao = 3000,
  onFechar,
}) => {
  useEffect(() => {
    if (duracao && onFechar) {
      const timer = setTimeout(onFechar, duracao);
      return () => clearTimeout(timer);
    }
  }, [duracao, onFechar]);

  return (
    <div className={`alerta alerta-${tipo}`}>
      <div className="alerta-icone">
        {tipo === 'sucesso' && '✓'}
        {tipo === 'erro' && '✕'}
        {tipo === 'aviso' && '⚠'}
        {tipo === 'info' && 'ℹ'}
      </div>
      <div className="alerta-conteudo">
        <p>{mensagem}</p>
      </div>
      {onFechar && (
        <button
          className="alerta-fechar"
          onClick={onFechar}
          aria-label="Fechar alerta"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alerta;
