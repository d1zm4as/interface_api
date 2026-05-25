/**
 * Componente de Formulário de Produto
 * Permite criar e editar produtos
 */

import React, { useState, useEffect } from 'react';
import { Produto, CriarProduto, AtualizarProduto } from '../types/Produto';
import { criarProduto, atualizarProduto } from '../services/api';
import './FormularioProduto.css';

interface FormularioProdutoProps {
  produtoParaEditar?: Produto | null;
  aoSalvar: () => void;
  aoLimpar: () => void;
}

export const FormularioProduto: React.FC<FormularioProdutoProps> = ({
  produtoParaEditar,
  aoSalvar,
  aoLimpar,
}) => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [formData, setFormData] = useState<CriarProduto>({
    name: '',
    description: '',
    price: 0,
    category: '',
    active: true,
  });

  /**
   * Preenche o formulário quando há um produto para editar
   */
  useEffect(() => {
    if (produtoParaEditar) {
      const { id, createdAt, ...dados } = produtoParaEditar;
      setFormData(dados);
    } else {
      limparFormulario();
    }
  }, [produtoParaEditar]);

  /**
   * Limpa o formulário
   */
  const limparFormulario = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      active: true,
    });
    setSucesso(false);
    setErro(null);
  };

  /**
   * Trata mudanças nos campos do formulário
   */
  const handleMudar = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseFloat(value)
          : value,
    });
  };

  /**
   * Envia o formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setSucesso(false);

    try {
      if (produtoParaEditar) {
        // Editar produto existente
        const atualizacoes: AtualizarProduto = {
          ...formData,
        };
        await atualizarProduto(produtoParaEditar.id, atualizacoes);
        setSucesso(true);
      } else {
        // Criar novo produto
        await criarProduto(formData);
        setSucesso(true);
        limparFormulario();
      }

      // Notifica o componente pai
      aoSalvar();

      // Remove mensagem de sucesso após 3 segundos
      setTimeout(() => setSucesso(false), 3000);
    } catch (erro) {
      setErro('Erro ao salvar produto. Tente novamente.');
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Trata clique no botão limpar
   */
  const handleLimpar = () => {
    limparFormulario();
    aoLimpar();
  };

  return (
    <form className="formulario-produto" onSubmit={handleSubmit}>
      <h2>{produtoParaEditar ? 'Editar Produto' : 'Novo Produto'}</h2>

      {erro && <div className="mensagem-erro">{erro}</div>}
      {sucesso && (
        <div className="mensagem-sucesso">
          {produtoParaEditar
            ? 'Produto atualizado com sucesso!'
            : 'Produto criado com sucesso!'}
        </div>
      )}

      <div className="grupo-form">
        <label htmlFor="name">Nome *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleMudar}
          required
          placeholder="Nome do produto"
        />
      </div>

      <div className="grupo-form">
        <label htmlFor="description">Descrição *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleMudar}
          required
          placeholder="Descrição do produto"
          rows={4}
        />
      </div>

      <div className="grupo-form-linha">
        <div className="grupo-form">
          <label htmlFor="price">Preço (R$) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleMudar}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="grupo-form">
          <label htmlFor="category">Categoria *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleMudar}
            required
            placeholder="Ex: Eletrônicos"
          />
        </div>
      </div>

      <div className="grupo-form-checkbox">
        <label htmlFor="active">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={handleMudar}
          />
          Produto Ativo
        </label>
      </div>

      <div className="grupo-botoes">
        <button
          type="submit"
          className="btn-salvar"
          disabled={carregando}
        >
          {carregando
            ? 'Salvando...'
            : produtoParaEditar
            ? 'Atualizar'
            : 'Criar Produto'}
        </button>
        <button
          type="button"
          className="btn-limpar"
          onClick={handleLimpar}
          disabled={carregando}
        >
          Limpar
        </button>
      </div>
    </form>
  );
};
