'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: "Eduardo Nogueira",
        email: "eduardo@nogueira.com",
        cargo: "Desenvolvedor Java Sênior",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Gilmar Pereira",
        email: "gilmar@pereira.com",
        cargo: "Desenvolvedor Frontend",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Gustavo Pereira",
        email: "gustavo@pereira.com",
        cargo: "Desenvolvedor Java",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "João da Silva",
        email: "joão@silva.com",
        cargo: "Desenvolvedor Pleno",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Lucas Henrique",
        email: "lucas@henrique.com",
        cargo: "Desenvolvedor Backend",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Marcos Silva",
        email: "marcos@silva.com",
        cargo: "Desenvolvedor Sênior",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Maria Eduarda",
        email: "maria@eduarda.com",
        cargo: "Desenvolvedora",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Matheus Henrique",
        email: "matheus@henrique.com",
        cargo: "Desenvolvedor Pleno",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Mayara Santos",
        email: "mayara@santos.com",
        cargo: "Desenvolvedora Sênior",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Miguel Marques",
        email: "miguel@marques.com",
        cargo: "Desenvolvedor Mobile",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Tiago Marcelo",
        email: "tiago@marcelo.com",
        cargo: "Desenvolvedor",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Vanessa Marques",
        email: "vanessa@marques.com",
        cargo: "Desenvolvedora",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "dev",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Fernando Duarte",
        email: "fernando@duarte.com",
        cargo: "Desenvolvedor",
        senha: '$2b$10$oa1pvwaQFW3AVWUW.P2TEen5Gmc7HhiVgBv9UGUddX9sHvP/N5ExW',
        role: "gestor",
        codigo_temp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('usuarios', null, {})
  }
};
