import * as Yup from 'yup';
// Modelo
// Empresa
import Companies from '../models/Company';

class CompanyController {
    async index(req, res) {
        // Somente ativos
        const Company = await Companies.findAll({
            where: {
                active: true,
            },
        });

        return res.json(Company);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            identification: Yup.string().required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }
        // Realizar cadastro
        const Company = await Companies.create(req.body);

        return res.json(Company);
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            active: Yup.boolean(),
            description: Yup.string(),
            identification: Yup.number(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }

        // Oficina a ser atualizado
        const Exists = await Companies.findByPk(req.body.id);

        if (!Exists) {
            // Oficina invalido
            return res.json({
                status: 401,
                msg: 'Oficina inválida ou não existe.',
            });
        }

        // Atualizando Oficina
        const Company = await Exists.update(req.body);

        return res.json(Company);
    }
}

export default new CompanyController();
