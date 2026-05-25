/**
 * Componente de Listagem de Produtos
 * Exibe a tabela com todos os produtos cadastrados
 */

import React, { useState, useEffect } from 'react';
import { Produto } from '../types/Produto';
import { listarProdutos, removerProduto } from '../services/api';
import './ListaProdutos.css';

interface ListaProdutosProps {
  atualizarLista: boolean;
  aoEditarProduto: (produto: Produto) => void;
}

export const ListaProdutos: React.FC<ListaProdutosProps> = ({
  atualizarLista,
  aoEditarProduto,
}) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  /**
   * Carrega a lista de produtos da API
   */
  const carregarProdutos = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch (erro) {
      setErro('Erro ao carregar produtos. Tente novamente.');
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Carrega produtos ao montar o componente e quando atualizarLista muda
   */
  useEffect(() => {
    carregarProdutos();
  }, [atualizarLista]);

  /**
   * Remove um produto com confirmação
   */
  const handleRemover = async (id: string | number, nome: string) => {
    if (!window.confirm(`Tem certeza que deseja remover o produto "${nome}"?`)) {
      return;
    }

    try {
      await removerProduto(id);
      setErro(null);
      carregarProdutos();
    } catch (erro) {
      setErro('Erro ao remover produto. Tente novamente.');
      console.error(erro);
    }
  };

  if (carregando) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="lista-produtos">
      <h2>Produtos Cadastrados</h2>

      {erro && <div className="mensagem-erro">{erro}</div>}

      {produtos.length === 0 ? (
        <p className="mensagem-vazia">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="tabela-responsiva">
          <table className="tabela-produtos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.name}</td>
                  <td>{produto.description}</td>
                  <td>R$ {produto.price.toFixed(2)}</td>
                  <td>{produto.category}</td>
                  <td>
                    <span
                      className={`badge ${produto.active ? 'ativo' : 'inativo'}`}
                    >
                      {produto.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>{new Date(produto.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="acoes">
                    <button
                      className="btn-editar"
                      onClick={() => aoEditarProduto(produto)}
                      title="Editar produto"
                    >
                      Editar
                    </button>
                    <button
                      className="btn-remover"
                      onClick={() => handleRemover(produto.id, produto.name)}
                      title="Remover produto"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
