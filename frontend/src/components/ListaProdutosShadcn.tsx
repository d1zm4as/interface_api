/**
 * Componente de Listagem de Produtos com shadcn/ui
 * Exibe a tabela com todos os produtos cadastrados
 */

import React, { useState, useEffect } from 'react';
import { Produto } from '../types/Produto';
import { listarProdutos, removerProduto } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { AlertCircle, Edit2, Loader2, Trash2 } from 'lucide-react';

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
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [removendo, setRemovendo] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

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

  useEffect(() => {
    carregarProdutos();
  }, [atualizarLista]);

  const handleRemoverClick = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  const handleConfirmarRemocao = async () => {
    if (!produtoSelecionado) return;

    setRemovendo(true);
    try {
      await removerProduto(produtoSelecionado.id);
      setErro(null);
      carregarProdutos();
      setModalAberto(false);
      setProdutoSelecionado(null);
    } catch (erro) {
      setErro('Erro ao remover produto. Tente novamente.');
      console.error(erro);
    } finally {
      setRemovendo(false);
    }
  };

  if (carregando) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Carregando produtos...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Produtos Cadastrados</CardTitle>
          <CardDescription>
            {produtos.length} produto{produtos.length !== 1 ? 's' : ''} no total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {erro && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 mb-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{erro}</p>
            </div>
          )}

          {produtos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Crie seu primeiro produto usando o formulário acima.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold">Descrição</th>
                    <th className="text-right py-3 px-4 font-semibold">Preço</th>
                    <th className="text-left py-3 px-4 font-semibold">Categoria</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                    <th className="text-center py-3 px-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto) => (
                    <tr key={produto.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{produto.name}</td>
                      <td className="py-3 px-4 max-w-xs truncate text-muted-foreground">
                        {produto.description}
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        R$ {produto.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">{produto.category}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            produto.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {produto.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => aoEditarProduto(produto)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoverClick(produto)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o produto "{produtoSelecionado?.name}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setModalAberto(false);
                setProdutoSelecionado(null);
              }}
              disabled={removendo}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmarRemocao}
              disabled={removendo}
            >
              {removendo ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removendo...
                </>
              ) : (
                'Remover'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
