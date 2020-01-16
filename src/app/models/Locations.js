import Sequelize, { Model } from 'sequelize';

class Locations extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
                active: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    // FK
    static associate(models) {
        // FK id da Setor
        this.belongsTo(models.Sector, { foreignKey: 'sector_id', as: 'sector' });
    }
}

export default Locations;
