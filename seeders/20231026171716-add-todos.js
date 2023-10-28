'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Todos', [
    { title: 'Membuat project',
      createdAt: new Date(),
      updatedAt: new Date()
  },
    { title: 'Belajar Sequelize',
    createdAt: new Date(),
      updatedAt: new Date()
   },
    { title: 'Mengerjakan Homework',
    createdAt: new Date(),
      updatedAt: new Date()
   },
  ]);
},
  
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
