/**
 * Componente de Formulário de Produto com shadcn/ui
 * Permite criar e editar produtos
 */

import React, { useState, useEffect } from 'react';
import { Produto, CriarProduto, AtualizarProduto } from '../types/Produto';
import { criarProduto, atualizarProduto } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { CATEGORIAS_PADRAO } from '../constants/config';

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

  useEffect(() => {
    if (produtoParaEditar) {
      const { id, createdAt, ...dados } = produtoParaEditar;
      setFormData(dados);
    } else {
      limparFormulario();
    }
  }, [produtoParaEditar]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    setSucesso(false);

    try {
      if (produtoParaEditar) {
        const atualizacoes: AtualizarProduto = { ...formData };
        await atualizarProduto(produtoParaEditar.id, atualizacoes);
        setSucesso(true);
      } else {
        await criarProduto(formData);
        setSucesso(true);
        limparFormulario();
      }

      aoSalvar();

      setTimeout(() => setSucesso(false), 3000);
    } catch (erro) {
      setErro('Erro ao salvar produto. Tente novamente.');
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  const handleLimpar = () => {
    limparFormulario();
    aoLimpar();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{produtoParaEditar ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
        <CardDescription>
          {produtoParaEditar
            ? 'Atualize as informações do produto'
            : 'Preencha os dados para criar um novo produto'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {erro && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{erro}</p>
            </div>
          )}

          {sucesso && (
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-900 rounded-lg border border-green-200">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                {produtoParaEditar
                  ? 'Produto atualizado com sucesso!'
                  : 'Produto criado com sucesso!'}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleMudar}
              required
              placeholder="Nome do produto"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleMudar}
              required
              placeholder="Descrição do produto"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
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

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleMudar}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Selecione uma categoria</option>
                {CATEGORIAS_PADRAO.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleMudar}
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="active" className="font-normal cursor-pointer">
              Produto Ativo
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={carregando}
              className="flex-1"
            >
              {carregando ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : produtoParaEditar ? (
                'Atualizar'
              ) : (
                'Criar Produto'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleLimpar}
              disabled={carregando}
            >
              Limpar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
