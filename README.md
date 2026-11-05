# API REST com Fastify

**API REST para gestão de alunos**

API RESTful desenvolvida para gerenciar alunos armazenados em um banco de dados MySQL, permitindo cadastrar, consultar, atualizar e excluir registros por meio de endpoints HTTP.

# 1. Descrição

Esta API foi desenvolvida para controlar informações de alunos em um ambiente de estudo, com foco nas operações básicas de CRUD. O projeto demonstra a construção de uma API REST utilizando **Node.js** e **Fastify**, com respostas em JSON, validação de dados e acesso ao MySQL por meio do `mysql2`.

# 2. Funcionalidades

- Cadastro de alunos;
- Listagem de todos os alunos;
- Consulta de aluno por ID;
- Atualização de dados do aluno;
- Exclusão de aluno por ID;
- Validação dos parâmetros e do corpo das requisições;
- Conexão com banco de dados MySQL por meio de um pool de conexões;
- Encerramento controlado da aplicação.

# 3. Tecnologias Utilizadas

- Node.js;
- Fastify;
- JavaScript;
- MySQL;
- mysql2;
- Docker Compose.

# 4. Arquitetura e Organização do Projeto

```
api-fastify/
│
├── src/
│   ├── controllers/
│   │   └── alunoController.js
│   │
│   ├── database/
│   │   └── connection.js
│   │
│   ├── repositories/
│   │   └── alunoRepository.js
│   │
│   ├── routes/
│   │   └── alunoRoutes.js
│   │
│   ├── schemas/
│   │   └── alunoSchemas.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
└── package-lock.json
```

Descrição resumida:

- `src/server.js` — inicia o servidor e verifica a conexão com o banco de dados;
- `src/app.js` — configura o Fastify, registra as rotas e trata erros;
- `src/controllers/alunoController.js` — recebe as requisições e constrói as respostas;
- `src/repositories/alunoRepository.js` — executa as operações SQL relacionadas aos alunos;
- `src/database/connection.js` — configura o pool de conexões com o MySQL;
- `src/routes/alunoRoutes.js` — define os endpoints da API;
- `src/schemas/alunoSchemas.js` — define as regras de validação das requisições;
- `docker-compose.yml` — configura o container e o volume do MySQL;
- `package.json` — define os scripts e as dependências do projeto.

# 5. Pré-requisitos

Antes de executar o projeto, verifique se você possui instalado:

- Node.js;
- npm;
- Git;
- Docker;
- Docker Compose.

# 6. Instalação

## 6.1 Clone o repositório

```
git clone <https://github.com/Daniel-moura-carreiro/api-fastify.git>
```

## 6.2 Acesse a pasta do projeto

```
cd api-fastify
```

## 6.3 Instale as dependências

```
npm install
```

# 7. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto utilizando como referência o arquivo
`.env.example` e configure `DB_USER` e `DB_PASSWORD`.  

Exemplo:
```
DB_USER=usuario_do_banco_de_dados
DB_PASSWORD=senha_do_banco_de_dados
```

**Importante:** senhas, tokens, chaves de API e outras informações sensíveis não devem ser armazenadas no repositório Git.

O arquivo .env deve estar incluído no .gitignore.

# 8. Configuração do Banco de Dados

Suba o container do MySQL com:

```
docker compose up -d
```

O `docker-compose.yml` cria o banco `api_rest`, o usuário `api_user` e o volume `mysql_data` para persistência dos dados.

Crie a tabela `alunos` no banco de dados antes de iniciar a API:

```sql
CREATE TABLE alunos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	curso VARCHAR(100) NOT NULL
);
```

# 9. Execução do Projeto

## Ambiente de desenvolvimento

```
npm run dev
```

## Execução direta

```
npm start
```

Após iniciar a aplicação, o servidor ficará disponível em:

```
http://localhost:3000
```

# 10. Endpoints da API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/alunos` | Lista todos os alunos |
| GET | `/api/alunos/:id` | Busca um aluno pelo ID |
| POST | `/api/alunos` | Cadastra um novo aluno |
| PUT | `/api/alunos/:id` | Atualiza os dados de um aluno |
| DELETE | `/api/alunos/:id` | Remove um aluno pelo ID |

# 11. Exemplos de Requisição e Resposta

## Cadastro de aluno

```http
POST /api/alunos
Content-Type: application/json
```

```json
{
	"nome": "Ana",
	"curso": "ADS"
}
```

Resposta `201 Created`:

```json
{
	"id": 1,
	"nome": "Ana",
	"curso": "ADS"
}
```

## Listagem de alunos

```http
GET /api/alunos
```

```json
[
	{
		"id": 1,
		"nome": "Ana",
		"curso": "ADS"
	},
	{
		"id": 2,
		"nome": "Bruno",
		"curso": "Sistemas de Informação"
	}
]
```

## Consulta por ID

```http
GET /api/alunos/1
```

```json
{
	"id": 1,
	"nome": "Ana",
	"curso": "ADS"
}
```

## Atualização de aluno

```http
PUT /api/alunos/1
Content-Type: application/json
```

```json
{
	"nome": "Ana Silva",
	"curso": "Engenharia de Software"
}
```

## Exclusão de aluno

```http
DELETE /api/alunos/1
```

A API retorna `204 No Content` quando o aluno é removido com sucesso.


# 12. Tratamento de Erros

A API utiliza um tratamento global de erros configurado no Fastify. As respostas de erro são retornadas em JSON e seguem os padrões abaixo:

## Aluno não encontrado

Quando o ID informado não corresponde a um aluno cadastrado, a API retorna `404 Not Found`:

```json
{
	"message": "Aluno não encontrado"
}
```

## Dados inválidos

Quando os parâmetros ou o corpo da requisição não atendem às regras de validação, a API retorna `404 Not Found` com a mensagem e os detalhes dos erros encontrados:

```json
{
	"message": "Dados inválidos",
	"errors": []
}
```

Os detalhes da validação são fornecidos pelo Fastify no campo `errors`.

## Erro interno

Quando ocorre uma falha inesperada no servidor, a API retorna `500 Internal Server Error` sem expor detalhes internos da aplicação:

```json
{
	"message": "Erro interno do servidor"
}
```

# 13. Validação dos Dados

O corpo das requisições `POST` e `PUT` deve conter:

- `nome`: texto com entre 2 e 100 caracteres;
- `curso`: texto com entre 2 e 100 caracteres.

O parâmetro `id` deve ser um número inteiro maior ou igual a 1. Campos adicionais não são permitidos.

# 14. Modelo de Dados

A API trabalha com a entidade `Aluno`.

```
Aluno
├── id
├── nome
└── curso
```

Estrutura da entidade:

- `id`: identificador único e gerado automaticamente pelo banco;
- `nome`: nome do aluno;
- `curso`: curso do aluno.

# 15. Comparando Express e Fastify

A arquitetura da aplicação continua praticamente igual:

```text
Route
 ↓
Controller
 ↓
Repository
 ↓
Database
```

A principal diferença está na camada HTTP. O Fastify mantém conceitos semelhantes aos do Express, mas possui recursos e uma forma própria de organizar a aplicação.

| Recurso | Express | Fastify |
|---|---|---|
| **Importação** | `import express from 'express'` | `import Fastify from 'fastify'` |
| **Criando a aplicação** | `const app = express()` | `const app = Fastify()` |
| **Recebendo JSON** | `app.use(express.json())` | Não é necessário para `application/json` |
| **Criando rotas** | `router.get('/:id', controller.show)` | `fastify.get('/:id', controller.show)` |
| **Registrando rotas** | `app.use('/alunos', router)` | `app.register(alunoRoutes, { prefix: '/alunos' })` |
| **Parâmetros** | `req.params` | `request.params` |
| **Body** | `req.body` | `request.body` |
| **Query string** | `req.query` | `request.query` |
| **Status HTTP** | `res.status(201).json(aluno)` | `reply.code(201).send(aluno)` |
| **Resposta JSON simples** | `res.json(alunos)` | `return alunos` |


Além das funcionalidades básicas, o Fastify possui alguns conceitos próprios que são importantes na organização da aplicação:

- **Plugins** — permitem organizar e reutilizar funcionalidades da aplicação.
- `register` — utilizado para registrar plugins, incluindo plugins de rotas.
- **Hooks** — permitem executar funções em determinados momentos do ciclo de vida da requisição ou da aplicação.
- **JSON Schema** — utilizado para definir e validar a estrutura dos dados recebidos e enviados.
- `request` / `reply` — objetos utilizados para acessar informações da requisição e construir a resposta.
- **Logging integrado** — o Fastify possui sistema de logs integrado.

# 16. Autor

**Nome:** Daniel Moura Carreiro  
**Turma:** ADS 2024.2N  
**Unidade Curricular:** Programação Web 2

# 17. Licença e Uso Acadêmico

Projeto desenvolvido para fins acadêmicos e de aprendizado na disciplina de Programação Web 2.

O código poderá ser utilizado para avaliação e acompanhamento acadêmico durante o curso.
