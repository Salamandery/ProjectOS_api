'use strict';
// Migration coluna de relacionamento serviço e oficina
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('services', 'workshop_id', {
            type: Sequelize.INTEGER,
            references: { model: 'workshops', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('services', 'workshop_id');
    },
};
