import Sequelize, { Model } from 'sequelize';

class UserService extends Model {
    static init(sequelize) {
        super.init(
            {
                note: Sequelize.STRING,
                date_initial: Sequelize.DATE,
                date_final: Sequelize.DATE,
                min_to_resolve: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // FK
    static associate(models) {
        // FK id do arquivo
        this.belongsTo(models.Services, {
            foreignKey: 'service_id',
            as: 'service',
        });
        // FK id do usuário
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        // FK id do solução
        this.belongsTo(models.Solutions, {
            foreignKey: 'solution_id',
            as: 'solution',
        });
    }
}

export default UserService;
