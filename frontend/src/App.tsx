/**
 * Aplicação Principal
 * Frontend com shadcn/ui e Tailwind CSS
 */

import React, { useState } from 'react';
import { Produto } from './types/Produto';
import { FormularioProduto } from './components/FormularioProdutoShadcn';
import { ListaProdutos } from './components/ListaProdutosShadcn';
import { Package, ArrowUp } from 'lucide-react';
import { Button } from './components/ui/button';
import './globals.css';

function App() {
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(null);
  const [atualizarLista, setAtualizarLista] = useState(false);
  const [mostrarBotaoTopo, setMostrarBotaoTopo] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setMostrarBotaoTopo(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollParaTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSalvarProduto = () => {
    setAtualizarLista(!atualizarLista);
    setProdutoParaEditar(null);
  };

  const handleLimparFormulario = () => {
    setProdutoParaEditar(null);
  };

  const handleEditarProduto = (produto: Produto) => {
    setProdutoParaEditar(produto);
    const formulario = document.querySelector('[data-formulario]');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Produtos</h1>
                <p className="text-xs text-muted-foreground">Gerenciamento Simplificado</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Sistema Web</p>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Formulário */}
          <div data-formulario>
            <FormularioProduto
              produtoParaEditar={produtoParaEditar}
              aoSalvar={handleSalvarProduto}
              aoLimpar={handleLimparFormulario}
            />
          </div>

          {/* Lista */}
          <div>
            <ListaProdutos
              atualizarLista={atualizarLista}
              aoEditarProduto={handleEditarProduto}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Sistema de Gerenciamento de Produtos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      {mostrarBotaoTopo && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollParaTopo}
          className="fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          title="Voltar ao topo"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default App;
