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

    await queryInterface.bulkInsert('habilidades_devs', [
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 3,
        id_habilidade: 1,
        id_dev: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 2,
        id_habilidade: 4,
        id_dev: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nivel: 5,
        id_habilidade: 7,
        id_dev: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('habilidades_devs', null, {})
  }
};
