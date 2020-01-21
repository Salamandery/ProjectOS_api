import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
// Configurações da Sessão
import conf from '../../config/auth';
// Modelo do usuário
import User from '../models/Users';

class SessionController {
    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            login: Yup.string().required(),
            password: Yup.string()
                .required()
                .min(6),
            company: Yup.number().required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }

        // Dados pelo body
        const { login, password, company } = req.body;

        // Verifica se usuário existe
        const user = await User.findOne({
            where: { login: login.toLowerCase() },
        });

        if (!user) {
            // Senão existe retorna erro
            return res.json({ status: 401, msg: 'Usuário ou senha inválida!' });
        }

        if (!(await user.checkPassword(password))) {
            // Se senha inválida retorna erro
            return res.json({ status: 401, msg: 'Senha inválida!' });
        }

        const { id, name, email, workshops, workshop_default } = user;
        // Se tudo ocorreu bem gera token para continuar a navegar pela aplicação em rotas privadas
        return res.json({
            user: {
                id,
                name,
                email,
                login,
            },
            token: jwt.sign(
                {
                    id,
                    login,
                    email,
                    comp: company,
                    wd: workshop_default,
                    ws: workshops,
                },
                conf.secret,
                { expiresIn: conf.expiresIn }
            ),
        });
    }
}

export default new SessionController();
