/**
 * Componente de Modal de Confirmação
 * Reutilizável para qualquer ação que precisa de confirmação
 */

import React from 'react';
import './Modal.css';

interface ModalConfirmacaoProps {
  titulo: string;
  mensagem: string;
  botaoPrincipalTexto?: string;
  botaoCancelTexto?: string;
  perigo?: boolean;
  aberto: boolean;
  aoConfirmar: () => void;
  aoCancelar: () => void;
  carregando?: boolean;
}

export const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  titulo,
  mensagem,
  botaoPrincipalTexto = 'Confirmar',
  botaoCancelTexto = 'Cancelar',
  perigo = false,
  aberto,
  aoConfirmar,
  aoCancelar,
  carregando = false,
}) => {
  if (!aberto) return null;

  return (
    <>
      <div className="modal-overlay" onClick={aoCancelar} />
      <div className="modal">
        <div className="modal-conteudo">
          <h2 className="modal-titulo">{titulo}</h2>
          <p className="modal-mensagem">{mensagem}</p>

          <div className="modal-botoes">
            <button
              className="btn-modal btn-cancel"
              onClick={aoCancelar}
              disabled={carregando}
            >
              {botaoCancelTexto}
            </button>
            <button
              className={`btn-modal btn-confirmar ${perigo ? 'perigo' : ''}`}
              onClick={aoConfirmar}
              disabled={carregando}
            >
              {carregando ? 'Processando...' : botaoPrincipalTexto}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmacao;
