'use strict';
// Migration da tabela de soluções
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('companies', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            identification: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('companies');
    },
};
