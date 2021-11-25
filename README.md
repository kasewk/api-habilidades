# API Habilidades
API de um catálogo de habilidades


## Para instalar a aplicação em sua maquina siga os passos:
- Clone o repositório
- Rode o comando npm install na pasta do projeto
- Abra o arquivo config.json dentro da pasta database/config
- Coloque suas credencias do MySQL
- No banco de dados crie um banco de dados chamado "habilidades"
    CREATE DATABASE habilidades;
- Na pasta do projeto rode o comando abaixo para criar as tabelas do banco
    npx sequelize-cli db:migrate
- Também na pasta do projeto rode o comando abaixo para popular o banco
    npx sequelize-cli db:seed:all
