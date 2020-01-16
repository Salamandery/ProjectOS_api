import Sequelize, { Model } from 'sequelize';

class Solutions extends Model {
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
        // FK id da oficina
        this.belongsTo(models.Workshop, { foreignKey: 'workshop_id', as: 'workshop' });
    }
}

export default Solutions;
