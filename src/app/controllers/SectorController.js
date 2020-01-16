import * as Yup from 'yup';
// Modelo
// Setores
import Sectors from '../models/Sector';
// Empresa
import Company from '../models/Company';

class SectorController {
    async index(req, res) {
        // Somente ativos
        const Sector = await Sectors.findAll({
            attributes: ['id', 'description'],
            where: {
                active: true,
            },
            include: [
                {
                    model: Company,
                    as: 'company',
                    attributes: ['id', 'description', 'identification', 'active']
                }
            ]
        });

        return res.json(Sector);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            description: Yup.string()
                .required(),
            company_id: Yup.number(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }

        // Realizar cadastro
        const Sector = await Sectors.create(req.body);

        return res
            .json({ msg: "Cadastro realizado com sucesso!", Sector});
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            active: Yup.boolean(),
            description: Yup.string(),
            company_id: Yup.number(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }

        // Setor a ser atualizado
        const Exists = await Sectors.findByPk(req.body.id);

        if (!Exists) {
            // Setor invalido
            return res.status(401).json({ msg: 'Setor inválida ou não existe.' });
        }

        // Atualizando Setor 
        const Sector = await Exists.update(req.body);

        return res
            .json({ msg: "Alteração realizada com sucesso!", Sector});
    }
}

export default new SectorController();