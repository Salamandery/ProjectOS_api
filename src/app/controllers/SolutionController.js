import * as Yup from 'yup';
// Modelo
// Soluções
import Solutions from '../models/Solutions';

class SolutionController {
    async index(req, res) {
        // Somente ativos
        const Solution = await Solutions.findAll({
            where: {
                active: true,
            }
        });

        return res.json(Solution);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            description: Yup.string()
                .required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
        const { description, active } = req.body;
        // Codigo da empresa logada
        const company_id = req.comp;
        // Realizar cadastro
        const Solution = await Solutions.create({
            description, 
            active,
            company_id,
        });

        return res
            .json({ msg: "Cadastro realizado com sucesso!", Solution});
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            active: Yup.boolean(),
            description: Yup.string(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }

        // Oficina a ser atualizado
        const Exists = await Solutions.findByPk(req.body.id);

        if (!Exists) {
            // Oficina invalido
            return res.status(401).json({ msg: 'Oficina inválida ou não existe.' });
        }

        // Atualizando Oficina 
        const Solution = await Exists.update(req.body);

        return res
            .json({ msg: "Alteração realizada com sucesso!", Solution});
    }
}

export default new SolutionController();