import Sequelize, { Model } from 'sequelize';

class Workshop extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
                active: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // FK
    static associate(models) {
        // FK id da empresa
        this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
    }
}

export default Workshop;
