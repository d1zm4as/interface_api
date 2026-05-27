/**
 * Componente de Listagem de Produtos com shadcn/ui
 * Exibe a tabela com filtros, busca e paginação
 */

import React, { useEffect, useState } from 'react';
import { CATEGORIAS_PADRAO } from '../constants/config';
import { Produto } from '../types/Produto';
import {
  listarProdutos,
  removerProduto,
  ListarProdutosParams,
  PaginacaoProdutosResposta,
} from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Filter,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';

interface ListaProdutosProps {
  atualizarLista: boolean;
  aoEditarProduto: (produto: Produto) => void;
}

type StatusFiltro = 'todos' | 'ativos' | 'inativos';
type OrdenacaoCampo = 'createdAt' | 'name' | 'price' | 'category' | 'active' | 'updatedAt';
type OrdenacaoDirecao = 'asc' | 'desc';

interface FiltrosTela {
  busca: string;
  categoria: string;
  status: StatusFiltro;
  porPagina: number;
  sortBy: OrdenacaoCampo;
  sortDirection: OrdenacaoDirecao;
}

const FILTROS_INICIAIS: FiltrosTela = {
  busca: '',
  categoria: '',
  status: 'todos',
  porPagina: 10,
  sortBy: 'createdAt',
  sortDirection: 'desc',
};

const campoClasse =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

function montarParams(filtros: FiltrosTela, paginaAtual: number): ListarProdutosParams {
  return {
    pagina: paginaAtual,
    porPagina: filtros.porPagina,
    ...(filtros.busca.trim() ? { busca: filtros.busca.trim() } : {}),
    ...(filtros.categoria ? { categoria: filtros.categoria } : {}),
    ...(filtros.status === 'ativos'
      ? { ativo: true }
      : filtros.status === 'inativos'
        ? { ativo: false }
        : {}),
    sortBy: filtros.sortBy,
    sortDirection: filtros.sortDirection,
  };
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
  const [filtros, setFiltros] = useState<FiltrosTela>(FILTROS_INICIAIS);
  const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosTela>(FILTROS_INICIAIS);
  const [paginacao, setPaginacao] = useState<PaginacaoProdutosResposta | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const carregarProdutos = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await listarProdutos(montarParams(filtrosAplicados, paginaAtual));
      setProdutos(resposta.dados);
      setPaginacao(resposta.paginacao);
    } catch (erro) {
      setErro('Erro ao carregar produtos. Tente novamente.');
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atualizarLista, filtrosAplicados, paginaAtual]);

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
      setModalAberto(false);
      setProdutoSelecionado(null);
      await carregarProdutos();
    } catch (erro) {
      setErro('Erro ao remover produto. Tente novamente.');
      console.error(erro);
    } finally {
      setRemovendo(false);
    }
  };

  const aplicarFiltros = () => {
    setPaginaAtual(1);
    setFiltrosAplicados(filtros);
  };

  const limparFiltros = () => {
    setFiltros(FILTROS_INICIAIS);
    setPaginaAtual(1);
    setFiltrosAplicados(FILTROS_INICIAIS);
  };

  const temPaginacao = Boolean(paginacao);
  const totalPaginas = paginacao?.totalPaginas ?? 0;
  const paginaExibida = paginacao?.paginaAtual ?? paginaAtual;
  const totalResultados = paginacao?.total ?? produtos.length;
  const categoriasFiltro = Array.from(new Set([...CATEGORIAS_PADRAO, ...produtos.map(p => p.category)]));

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
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>Produtos Cadastrados</CardTitle>
              <CardDescription>
                {totalResultados} produto{totalResultados !== 1 ? 's' : ''}{' '}
                {totalResultados === 1 ? 'encontrado' : 'encontrados'}
                {temPaginacao && totalPaginas > 0
                  ? ` • Página ${paginaExibida} de ${totalPaginas}`
                  : ''}
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtros ativos na lista</span>
            </div>
          </div>

          <div className="grid gap-3 rounded-xl border border-border/60 bg-muted/30 p-4 md:grid-cols-12">
            <div className="md:col-span-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Busca
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={filtros.busca}
                  onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
                  placeholder="Nome ou descrição"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Categoria
              </label>
              <select
                value={filtros.categoria}
                onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
                className={campoClasse}
              >
                <option value="">Todas as categorias</option>
                {categoriasFiltro.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </label>
              <select
                value={filtros.status}
                onChange={(e) =>
                  setFiltros({
                    ...filtros,
                    status: e.target.value as StatusFiltro,
                  })
                }
                className={campoClasse}
              >
                <option value="todos">Todos</option>
                <option value="ativos">Ativos</option>
                <option value="inativos">Inativos</option>
                </select>
              </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Ordenar por
              </label>
              <select
                value={filtros.sortBy}
                onChange={(e) =>
                  setFiltros({
                    ...filtros,
                    sortBy: e.target.value as OrdenacaoCampo,
                  })
                }
                className={campoClasse}
              >
                <option value="createdAt">Mais recentes</option>
                <option value="updatedAt">Atualizados</option>
                <option value="name">Nome</option>
                <option value="price">Preço</option>
                <option value="category">Categoria</option>
                <option value="active">Status</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Direção
              </label>
              <button
                type="button"
                onClick={() =>
                  setFiltros({
                    ...filtros,
                    sortDirection: filtros.sortDirection === 'asc' ? 'desc' : 'asc',
                  })
                }
                className={`${campoClasse} justify-between`}
              >
                <span>{filtros.sortDirection === 'asc' ? 'Asc' : 'Desc'}</span>
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Por página
              </label>
              <select
                value={filtros.porPagina}
                onChange={(e) =>
                  setFiltros({
                    ...filtros,
                    porPagina: Number(e.target.value),
                  })
                }
                className={campoClasse}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                </select>
              </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button type="button" onClick={aplicarFiltros}>
              Aplicar filtros
            </Button>
            <Button variant="outline" onClick={limparFiltros} type="button">
              <RefreshCw className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {erro && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{erro}</p>
            </div>
          )}

          {produtos.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-muted-foreground">Nenhum produto encontrado com esses filtros.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tente limpar os filtros ou ajustar os termos de busca.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-semibold">Nome</th>
                    <th className="px-4 py-3 text-left font-semibold">Descrição</th>
                    <th className="px-4 py-3 text-right font-semibold">Preço</th>
                    <th className="px-4 py-3 text-left font-semibold">Categoria</th>
                    <th className="px-4 py-3 text-center font-semibold">Status</th>
                    <th className="px-4 py-3 text-center font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto) => (
                    <tr key={produto.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="px-4 py-3">{produto.name}</td>
                      <td className="max-w-xs px-4 py-3 truncate text-muted-foreground">
                        {produto.description}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        R$ {produto.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">{produto.category}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            produto.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {produto.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => aoEditarProduto(produto)}>
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

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {totalResultados === 0
                ? 'Nenhum registro para exibir'
                : `Exibindo ${produtos.length} de ${totalResultados} resultado${
                    totalResultados !== 1 ? 's' : ''
                  }`}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setPaginaAtual((valor) => Math.max(1, valor - 1))}
                disabled={!paginacao?.temAnterior || carregando}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <div className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground">
                {paginaExibida} / {Math.max(totalPaginas, 1)}
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setPaginaAtual((valor) => valor + 1)}
                disabled={!paginacao?.temProxima || carregando}
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o produto &quot;{produtoSelecionado?.name}&quot;?
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
            <Button variant="destructive" onClick={handleConfirmarRemocao} disabled={removendo}>
              {removendo ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
