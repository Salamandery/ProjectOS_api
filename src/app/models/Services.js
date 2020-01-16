import Sequelize, { Model } from 'sequelize';

class Services extends Model {
    static init(sequelize) {
        super.init(
            {
                status: Sequelize.STRING,
                title: Sequelize.STRING,
                description: Sequelize.STRING,
                note: Sequelize.STRING,
                date: Sequelize.DATE,
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
        this.belongsTo(models.Files, { foreignKey: 'file_id', as: 'file' });
        // FK id do usuário
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        // FK id do usuário que atualizou
        this.belongsTo(models.User, { foreignKey: 'user_id_lastupdate', as: 'last_user' });
        // FK id do provedor de serviço
        this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
        // FK id da localidade
        this.belongsTo(models.Locations, { foreignKey: 'location_id', as: 'location' });
        // FK id da oficina
        this.belongsTo(models.Workshop, { foreignKey: 'workshop_id', as: 'workshop' });
    }
}

export default Services;
