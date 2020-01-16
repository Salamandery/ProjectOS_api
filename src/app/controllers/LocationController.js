import * as Yup from 'yup';
// Modelo
// Localidade
import Locations from '../models/Locations';
// Setores
import Sector from '../models/Sector';
// Empresa
import Company from '../models/Company';

class LocationController {
    async index(req, res) {
        // Somente ativos
        const Location = await Locations.findAll({
            where: {
                active: true,
            },
            include: [
                {
                    model: Sector,
                    as: 'sector',
                    attributes: ['id', 'description'],
                    where: {
                        company_id: req.comp,
                    },
                    include: {
                        model: Company,
                        as: 'company',
                        attributes: ['id', 'description'],
                    },
                },
            ],
        });

        return res.json(Location);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            sector_id: Yup.number(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }

        // Realizar cadastro
        const Location = await Locations.create(req.body);

        return res.json({ msg: 'Cadastro realizado com sucesso!', Location });
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            active: Yup.boolean(),
            description: Yup.string(),
            sector_id: Yup.number(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }

        // Localidade a ser atualizado
        const Exists = await Locations.findByPk(req.body.id);

        if (!Exists) {
            // Localidade invalido
            return res
                .status(401)
                .json({ msg: 'Localidade inválida ou não existe.' });
        }

        // Atualizando Localidade
        const Location = await Exists.update(req.body);

        return res.json({ msg: 'Alteração realizada com sucesso!', Location });
    }
}

export default new LocationController();
