'use strict';
// Migration coluna de relacionamento arquivo e serviço
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('services', 'file_id', {
            type: Sequelize.INTEGER,
            references: { model: 'files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('services', 'file_id');
    },
};
