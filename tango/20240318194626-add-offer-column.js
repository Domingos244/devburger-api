
/** @type {import('sequelize-cli').migration}*/
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('products', 'offer', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('products', 'offer');
    },
};