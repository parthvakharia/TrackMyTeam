'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Groups', ['ownerId']);
    await queryInterface.addIndex('GroupMembers', ['groupId']);
    await queryInterface.addIndex('GroupMembers', ['userId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Groups', ['ownerId']);
    await queryInterface.removeIndex('GroupMembers', ['groupId']);
    await queryInterface.removeIndex('GroupMembers', ['userId']);
  }
};
