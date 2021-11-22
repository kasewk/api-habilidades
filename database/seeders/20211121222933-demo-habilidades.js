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

    await queryInterface.bulkInsert('habilidades', [
      {
        nome: 'Angular',
        descricao: 'Angular é uma plataforma de aplicações web de código-fonte aberto e front-end baseado em TypeScript liderado pela Equipe Angular do Google.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Bootstrap',
        descricao: 'Bootstrap é um framework web com código-fonte aberto para desenvolvimento de componentes de interface e front-end.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'C',
        descricao: 'C é uma linguagem de programação compilada de propósito geral, estruturada, imperativa, procedural.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Docker',
        descricao: 'Docker é um conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ionic',
        descricao: '	Ionic é um SDK de código aberto completo para desenvolvimento de aplicativo móvel híbrido.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Java',
        descricao: 'Java é uma linguagem de programação orientada a objetos desenvolvida na década de 90.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Javascript',
        descricao: 'avaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'MongoDB',
        descricao: 'MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'NodeJS',
        descricao: 'Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'ReactJS',
        descricao: 'O React é uma biblioteca JavaScript de código aberto com foco em criar interfaces de usuário em páginas web.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'TypeScript',
        descricao: 'TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Vue.js',
        descricao: '	Vue.js é um framework JavaScript de código-aberto, focado no desenvolvimento de interfaces de usuário e aplicativos de página única.',
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

    await queryInterface.bulkDelete('habilidades', null, {})
  }
};
