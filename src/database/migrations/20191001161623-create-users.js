'use strict';
// Migration da tabela de usuários
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            tp_user: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'U',
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password_hash: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provider: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            workshop_default: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            workshops: {
                type: Sequelize.ARRAY(Sequelize.INTEGER),
                allowNull: true,
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
        return queryInterface.dropTable('users');
    },
};
