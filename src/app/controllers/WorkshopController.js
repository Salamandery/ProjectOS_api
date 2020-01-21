import * as Yup from 'yup';
// Modelo
// Oficina
import Workshops from '../models/Workshop';

class WorkshopController {
    async index(req, res) {
        // Somente ativos
        const Workshop = await Workshops.findAll({
            where: {
                active: true,
            },
        });

        return res.json(Workshop);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }
        const { description, active } = req.body;
        // Codigo da empresa logada
        const company_id = req.comp;
        // Realizar cadastro
        const Workshop = await Workshops.create({
            description,
            active,
            company_id,
        });

        return res.json(Workshop);
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            active: Yup.boolean(),
            description: Yup.string(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }

        const { id } = req.params;

        // Oficina a ser atualizado
        const Exists = await Workshops.findByPk(id);

        if (!Exists) {
            // Oficina invalido
            return res.json({
                status: 401,
                msg: 'Oficina inválida ou não existe.',
            });
        }

        // Atualizando Oficina
        const Workshop = await Exists.update(req.body);

        return res.json(Workshop);
    }
}

export default new WorkshopController();
