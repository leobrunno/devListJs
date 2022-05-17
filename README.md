
# DevListJS

Sistema para cadastro e gerenciamento de usuários desenvolvido em JavaScript, sendo dividido em duas aplicações (no mesmo repositório), uma API REST e um client para consumo dos dados cadastrados e manipulados. Contando também com dark mode e manutenção de estado após reload na página.

## 🚀 Começando

Para executar o projeto, será necessário ter instalado o Node.js 8.X e o npm 5.X (ou versões superiores das tecnologias listadas).

### 📋 Pré-requisitos

O projeto está dividido em duas partes, o backend localizado na pasta [devList-server](https://github.com/leobrunno/devListJs/tree/main/devList-server) e para 'liga-lo' você precisará ir até o diretório da pasta e executar o comando:

```
$ node index
```

Já o frontend está localizado na pasta [devList-client](https://github.com/leobrunno/devListJs/tree/main/devList-client), e você deverá executar o seguinte comando:

```
$ npm start
```

Após isso, a aplicação estará rodando no endereço http://localhost:3000

Caso queira, é possível rodar somente o server ([devList-server](https://github.com/leobrunno/devListJs/tree/main/devList-server)) e utilizar em outros projetos, as rotas estão mapeadas e documentadas no arquivo de collection do Postman, incluido na raiz do repositorio, bastando importa-lo no proprio Postman e começar a usar.


## 🛠️ Construído com

Para a construção do projeto foi utilizado as seguintes ferramentas:

* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem base para o projeto
* [Node.js](https://nodejs.org) - Server
* [NeDB](https://dbdb.io/db/nedb) - Armazenamento de dados
* [Express](https://www.slimframework.com/) - Client
* [AdminLTE](https://adminlte.io/) - Template utilizado nas páginas

## 📄 Licença

Este projeto está sob a licença  MIT.
