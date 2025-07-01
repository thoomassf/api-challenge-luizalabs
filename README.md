## 🛠️ Tecnologias
 - [Node.js](https://nodejs.org/en)
 - [Prisma](https://www.prisma.io/docs) (ORM)
 - PostgresSQL (Banco de dados)
 - Docker
 - [Jeager](https://www.jaegertracing.io) (Observabilidade local)
 - [Vitest](https://vitest.dev) (Testes)

## 🛠️ Regras da aplicação
Cadastro de lista de produtos favoritos
- [X] - O cadastro da lista de produtos favoritos deve conter o título e descrição;
- [X] - O cliente deve conseguir criar, visualizar, editar e remover uma lista de produtos favoritos;
- [X] - O cliente pode ter apenas 1 lista de produtos favoritos;
- [X] - Ao excluir a lista, deve se atentar que poderão existir produtos já favoritados e serão desfavoritados no momento da exclusão;

Favoritar Produtos
- [X] - Deve ser possível ver todos os produtos disponíveis no catálogo;
- [X] - A apresentação dos favoritos e da lista de produtos do catálogo deve conter o título, imagem, preço;
- [X] - O cliente deve conseguir favoritar qualquer produto do catálogo;
- [X] - Não deve ser possível favoritar um produto que não exista;
- [X] - Não deve ser possível favoritar um produto mais de uma vez;
- [X] - A lista deve conter no máximo 5 produtos favoritados;
- [X] - O cliente deve conseguir acessar sua tela de produtos favoritos


## 🏁 Começando

### 📥 Clone o projeto

```bash
git clone https://github.com/thoomassf/api-challenge-luizalabs.git && cd api-challenge-luizalabs
# ou
gh repo clone thoomassf/api-challenge-luizalabs && cd api-challenge-luizalabs
```

### ⚙️ Instalação das dependências
```bash
npm install
```

### 🔐 Configuração do ambiente
Crie o arquivo .env com base no .env.example:
```bash
cp .env.example .env
```
Edite suas variáveis de ambiente conforme necessário.

### 📈 Inicializar banco de dados
banco de dados no Docker (PostgreSQL)
```bash
docker-compose up -d
```
Execute as migrações do Prisma: 
Se executar a api no docker é necessário rodar o comando no Exec do container
Obs: caso já tenha rodado as migrações, não é necessário executar novamente
```bash
npx prisma migrate dev
```

### 🚀 Rodar o servidor
```bash
npm run dev
```
A aplicação estará disponível em: http://localhost:3333
Swagger disponível em: http://localhost:3333/docs

### 📈 Executar os testes
Testes unitários
```bash
npm run test
```
Testes e2e
```bash
npm run test:create-prisma-environment
npm run test:install-prisma-environment
npm run pretest:e2e
npm run test:e2e
```

### 👁️ Tracing Jaeger
Utilizei o Jaeger para observabilidade local.

O Jeager será inicializado junto com o banco de dados.

```bash
docker-compose up -d
```

Disponível em: http://localhost:16686
