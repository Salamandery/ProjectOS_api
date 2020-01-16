'use strict';
// Migration coluna de relacionamento localização e serviço
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user_services', 'solution_id', {
            type: Sequelize.INTEGER,
            references: { model: 'solutions', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('user_services', 'solution_id');
    },
};
