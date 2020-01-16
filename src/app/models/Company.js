import Sequelize, { Model } from 'sequelize';

class Company extends Model {
    static init(sequelize) {
        super.init(
            {
                description: Sequelize.STRING,
                identification: Sequelize.STRING,
                active: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Company;
