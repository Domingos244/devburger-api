'use strict';

/** @type {import('sequelize-cli').migration}*/
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('products', 'category_id', {
            type: Sequelize.INTEGER,
            reference: {
                model: 'categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('products', 'category_id');
    },
};
