# API Habilidades
API desenvolvida com expressa no NodeJS de um catálogo de habilidades


## Para instalar a aplicação em sua maquina siga os passos:
- Clone o repositório
- Rode o comando npm install na pasta do projeto
- Abra o arquivo config.json dentro da pasta database/config
- Coloque suas credencias do MySQL
- No banco de dados crie um banco de dados chamado "habilidades"<br>
  `CREATE DATABASE habilidades;`
- Na pasta do projeto rode o comando abaixo para criar as tabelas do banco<br>
  `npx sequelize-cli db:migrate`
- Também na pasta do projeto rode o comando abaixo para popular o banco<br>
  `npx sequelize-cli db:seed:all`
- Crie uma pasta chamada uploads na raiz do projeto, onde que vão ser armazenadas as imagens de perfil


## Tecnologias utilizadas:
- Javascript
- NodeJS
- Express
- Sequelize
- MySQL
