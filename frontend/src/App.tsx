/**
 * Aplicação Principal
 */

import React, { useState } from 'react';
import { Produto } from './types/Produto';
import { FormularioProduto } from './components/FormularioProduto';
import { ListaProdutos } from './components/ListaProdutos';
import './App.css';

function App() {
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(null);
  const [atualizarLista, setAtualizarLista] = useState(false);

  /**
   * Chamado quando um produto é salvo (criado ou atualizado)
   */
  const handleSalvarProduto = () => {
    setAtualizarLista(!atualizarLista);
    setProdutoParaEditar(null);
  };

  /**
   * Chamado quando o formulário é limpo
   */
  const handleLimparFormulario = () => {
    setProdutoParaEditar(null);
  };

  /**
   * Chamado quando um produto é selecionado para edição
   */
  const handleEditarProduto = (produto: Produto) => {
    setProdutoParaEditar(produto);
    // Scroll até o formulário
    const formulario = document.querySelector('.formulario-produto');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Sistema de Gerenciamento de Produtos</h1>
          <p>Crie, edite e gerencie seus produtos com facilidade</p>
        </div>
      </header>

      <main className="container">
        <FormularioProduto
          produtoParaEditar={produtoParaEditar}
          aoSalvar={handleSalvarProduto}
          aoLimpar={handleLimparFormulario}
        />

        <ListaProdutos
          atualizarLista={atualizarLista}
          aoEditarProduto={handleEditarProduto}
        />
      </main>

      <footer className="footer">
        <p>&copy; 2024 Sistema de Gerenciamento de Produtos. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
