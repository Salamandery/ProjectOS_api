// Migration coluna de relacionamento localização e serviço
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('services', 'location_id', {
            type: Sequelize.INTEGER,
            references: { model: 'locations', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('services', 'location_id');
    },
};
