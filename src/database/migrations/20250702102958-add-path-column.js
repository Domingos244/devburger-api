'use strict';

/** @type {import('sequelize-cli').migration}*/
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('categories', 'path', {
            type: Sequelize.STRING,
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('categories', 'path');
    },
};
