// Modelo do usuário
import User from '../models/Users';

class ProviderController {
    async index(req, res) {
        // Listando usuários
        const users = await User.findAll({
            where: {
                provider: true
            },
            order: ['name'],
            attributes: ['id', 'name', 'email', 'created_at'],
        });

        return res.json(users);
    }
}

export default new ProviderController();
