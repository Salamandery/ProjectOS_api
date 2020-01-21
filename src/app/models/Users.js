import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                login: Sequelize.STRING,
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
                workshop_default: Sequelize.INTEGER,
                workshops: Sequelize.ARRAY(Sequelize.INTEGER),
                active: Sequelize.BOOLEAN,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        // Operação executada antes de criar um usuário
        this.addHook('beforeSave', async user => {
            if (user.password) {
                // Criptografando senha antes de criação do usuário
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        return this;
    }

    checkPassword(password) {
        // Verifica se a senha está correta
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
