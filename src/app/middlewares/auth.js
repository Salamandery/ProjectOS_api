import jwt from 'jsonwebtoken';
// Convertendo promise para async/await
import { promisify } from 'util';
// Configuração de autenticação
import conf from '../../config/auth';

export default async (req, res, next) => {
    // Header autenticado
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Separação do header
        const [, token] = authHeader.split(' ');
        try {
            // Leitura de token - verificando se é válido
            const decoded = await promisify(jwt.verify)(token, conf.secret);

            // Definindo identificação do usuário
            req.userId = decoded.id;
            // Definindo identificação da empresa
            req.comp = decoded.comp;
            // Definindo oficina padrão
            req.wd = decoded.wd;
            // Definindo oficinas autorizadas
            req.ws = decoded.ws;
            // Se válido continua a navegação
            return next();
        } catch (err) {
            // Se token inválido bloqueia a navegação
            return res.json({ status: 401, msg: 'Token inválido' });
        }
    }
    // Se não há token bloqueia a navegação
    return res.json({ status: 401, msg: 'É necessário fazer login' });
};
