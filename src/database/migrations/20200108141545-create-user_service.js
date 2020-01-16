'use strict';
// Migration da tabela de relacionamento serviço e usuário
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_services', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            service_id: {
                type: Sequelize.INTEGER,
                references: { model: 'services', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            note: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            date_initial: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            date_final: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            min_to_resolve: {
                allowNull: true,
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('user_services');
    },
};
