# Desafio Técnico — Desenvolvedor Full Stack Júnior

Este desafio tem como objetivo avaliar se o candidato possui conhecimentos básicos de desenvolvimento **frontend**, **backend** e integração entre uma interface e uma API.

O foco principal não é criar uma aplicação complexa ou visualmente avançada. O objetivo é demonstrar domínio dos fundamentos: criação de API, consumo de dados no frontend, organização de código, manipulação de formulários e entendimento do fluxo completo de uma aplicação web.

O candidato pode utilizar qualquer linguagem, framework ou biblioteca de sua preferência (diferencial Node.js).

---

## Objetivo

Criar uma aplicação simples de gerenciamento de produtos.

A aplicação deve conter:

- Um backend com uma API de produtos.
- Um frontend simples consumindo essa API.
- Funcionalidades básicas de cadastro, listagem, edição e remoção de produtos.
- Instruções claras de como rodar o projeto.

---

## Requisitos do Backend

O backend deve disponibilizar uma API para gerenciamento de produtos.

### Entidade Produto

Cada produto deve possuir, no mínimo:

```ts
{
  id: string | number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: string;
}
```

---

## Rotas obrigatórias

A API deve possuir as seguintes rotas:

```http
GET /products
```

Lista todos os produtos.

```http
GET /products/:id
```

Busca um produto específico pelo ID.

```http
POST /products
```

Cria um novo produto.

```http
PUT /products/:id
```

Atualiza um produto existente.

```http
DELETE /products/:id
```

Remove um produto.

---

## Requisitos mínimos do Backend

O backend deve conter:

- Rotas funcionando corretamente.
- Validação básica dos dados recebidos.
- Tratamento básico de erros.
- Respostas HTTP adequadas.
- Código minimamente organizado.
- Alguma forma de persistência dos dados.

A persistência pode ser feita usando:

- Array em memória.
- Arquivo JSON.
- SQLite.
- PostgreSQL.
- MySQL.
- MongoDB.
- Outro banco de dados de preferência.

> Para este teste, não é obrigatório usar banco de dados real. O importante é demonstrar entendimento da criação e consumo de uma API.

---

## Requisitos do Frontend

O frontend deve ser uma interface simples para consumir a API de produtos.

A interface deve permitir:

- Listar produtos.
- Criar um novo produto.
- Editar um produto existente.
- Remover um produto.
- Visualizar informações básicas do produto.

---

## Campos obrigatórios no formulário

O formulário de produto deve conter:

- Nome.
- Descrição.
- Preço.
- Categoria.
- Status ativo/inativo.

---

## Requisitos mínimos do Frontend

O frontend deve conter:

- Integração real com a API criada.
- Formulário para cadastro de produto.
- Formulário ou tela para edição de produto.
- Listagem dos produtos cadastrados.
- Ação para remover produto.
- Feedback básico para o usuário.

Exemplos de feedback:

- Mensagem de carregamento.
- Mensagem de erro.
- Mensagem de sucesso.
- Confirmação antes de excluir um produto.

---

## Sobre a Interface

A interface pode ser simples e técnica.

Não é obrigatório criar uma interface visualmente sofisticada.

O mais importante é que a tela seja funcional, organizada e permita testar claramente as funcionalidades solicitadas.

Será observado:

- Clareza da interface.
- Organização dos campos.
- Facilidade para testar as ações.
- Funcionamento correto da integração com a API.

---

## Uso de Frameworks CSS

O uso de frameworks ou bibliotecas de CSS é opcional.

Exemplos:

- Tailwind CSS.
- Material UI.
- Bootstrap.
- Chakra UI.
- Shadcn/UI.
- CSS Modules.
- Styled Components.
- CSS puro.

> Usar algum framework CSS ou criar uma interface mais bem organizada será considerado um diferencial, mas não é obrigatório.

---

## Tecnologias Permitidas

O candidato pode usar qualquer tecnologia que preferir.

### Backend

Exemplos:

- Node.js.
- NestJS.
- Express.
- Fastify.
- Laravel.
- Django.
- FastAPI.
- Spring Boot.
- .NET.
- Outra linguagem ou framework de preferência.

### Frontend

Exemplos:

- React.
- Next.js.
- Vue.
- Angular.
- Svelte.
- HTML, CSS e JavaScript puro.
- Outra tecnologia de preferência.

### Banco de Dados

Exemplos:

- Array em memória.
- Arquivo JSON.
- SQLite.
- PostgreSQL.
- MySQL.
- MongoDB.
- Outro banco de dados de preferência.

---

## Docker

O uso de Docker ou Docker Compose não é obrigatório.

Será considerado um diferencial caso o candidato entregue o projeto com ambiente Docker configurado.

Exemplos de diferencial:

- Dockerfile para o backend.
- Dockerfile para o frontend.
- Docker Compose subindo frontend, backend e banco de dados.
- Documentação explicando como executar o projeto com Docker.

---

## Diferenciais

Os itens abaixo não são obrigatórios, mas contam pontos positivos:

- Uso de TypeScript.
- Uso de Docker ou Docker Compose.
- Uso de banco de dados real.
- Uso de framework CSS.
- Tratamento de erro no frontend.
- Loading nas requisições.
- Organização clara de pastas.
- Separação entre controller, service, repository ou estrutura equivalente.
- Commits organizados.
- README bem explicado.

---

## Entrega

O candidato deve entregar:

- Link do repositório GitHub, GitLab ou Bitbucket.
- Instruções de instalação.
- Instruções de execução do backend.
- Instruções de execução do frontend.
- Explicação breve das tecnologias utilizadas.
- Explicação breve das decisões tomadas.
- Informar se usou ou não Docker.
- Informar se usou banco de dados, arquivo, array em memória ou outra forma de persistência.

---

## README Esperado

O projeto deve possuir um README contendo pelo menos:

```md
# Nome do Projeto

## Tecnologias utilizadas

## Como instalar

## Como rodar o backend

## Como rodar o frontend

## Como acessar a aplicação

## Rotas da API

## Observações
```


## O que será avaliado

A avaliação será feita considerando principalmente se o candidato consegue demonstrar conhecimento prático.

### Backend

Será avaliado:

- Se a API funciona.
- Se as rotas foram criadas corretamente.
- Se os dados são recebidos e retornados corretamente.
- Se existe validação básica.
- Se existe tratamento básico de erros.
- Se o código está minimamente organizado.

### Frontend

Será avaliado:

- Se o frontend consome a API corretamente.
- Se é possível listar produtos.
- Se é possível criar produtos.
- Se é possível editar produtos.
- Se é possível remover produtos.
- Se os formulários funcionam.
- Se há feedback básico para o usuário.

### Geral

Será avaliado:

- Clareza do código.
- Organização do projeto.
- Facilidade para rodar.
- README bem explicado.
- Entendimento do fluxo frontend + backend.
- Capacidade de explicar o que foi feito.

---

## Critérios de Pontuação Sugeridos

| Critério | Peso |
|---|---:|
| Backend funcional | 25% |
| Frontend funcional | 25% |
| Integração frontend + API | 25% |
| Organização do código | 10% |
| README e facilidade de execução | 10% |
| Diferenciais técnicos | 5% |

---

## Observações Importantes

Não é necessário criar uma aplicação grande.

Não é obrigatório usar arquitetura avançada.

Não é obrigatório usar autenticação.

Não é obrigatório usar Docker.

Não é obrigatório usar banco de dados real.

Não é obrigatório criar uma interface bonita.

O foco é demonstrar conhecimento básico e capacidade de construir uma aplicação simples funcionando de ponta a ponta.

Evite copiar projetos prontos sem entender o que foi feito. Durante a avaliação, poderão ser feitas perguntas sobre o código e sobre as decisões tomadas.

---

## Perguntas que podem ser feitas na entrevista técnica

Após a entrega, o candidato poderá ser questionado sobre:

1. Como o frontend se comunica com o backend?
2. Como os produtos são armazenados?
3. Como você criou as rotas da API?
4. Como você tratou erros?
5. Como você validou os dados enviados pelo formulário?
6. Como rodar o projeto do zero?
7. O que você melhoraria se tivesse mais tempo?
8. Como você colocaria essa aplicação em produção?
9. Como protegeria essa API?
10. Como faria filtros ou paginação?
11. Por que escolheu essas tecnologias?
12. Quais foram as maiores dificuldades durante o desenvolvimento?

---

## Expectativa Final

Ao final do desafio, espera-se que o candidato entregue uma aplicação simples, funcional e fácil de executar.

O principal objetivo é verificar se o candidato entende o funcionamento básico de uma aplicação web completa:

```txt
Frontend → Requisição HTTP → API Backend → Dados → Resposta → Interface
```

A solução não precisa ser perfeita, mas precisa funcionar e ser compreensível.
