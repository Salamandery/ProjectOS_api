'use strict';
// Migration coluna de relacionamento empresa e oficina
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('solutions', 'workshop_id', {
            type: Sequelize.INTEGER,
            references: { model: 'workshops', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('solutions', 'workshop_id');
    },
};
