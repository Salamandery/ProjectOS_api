import * as Yup from 'yup';
import { startOfMonth } from 'date-fns';
// Sequelize options
import { Op } from 'sequelize';
// Modelo
// Serviço
import Services from '../models/Services';
// Usuários
import Users from '../models/Users';
// Localização
import Locations from '../models/Locations';
// Setor
import Sector from '../models/Sector';
// Oficinas
import Workshops from '../models/Workshop';

class ServiceController {
    async index(req, res) {
        // data inicial do mês atual
        const dateInitial = startOfMonth(new Date());
        const Now = new Date();

        // Listando Seriços
        const Service = await Services.findAll({
            attributes: [
                'id',
                'title',
                'status',
                'date',
                'description',
                'note',
            ],
            where: {
                user_id: req.userId,
                date: { [Op.gte]: dateInitial, [Op.lte]: Now },
            },
            include: [
                {
                    model: Locations,
                    as: 'location',
                    attributes: ['id', 'description'],
                    include: {
                        model: Sector,
                        as: 'sector',
                        attributes: ['id', 'description'],
                        where: {
                            company_id: req.comp,
                        },
                    },
                },
                {
                    model: Workshops,
                    as: 'workshop',
                    attributes: ['id', 'description'],
                    where: {
                        company_id: req.comp,
                    },
                },
                {
                    model: Users,
                    as: 'provider',
                    attributes: ['name', 'email', 'login', 'id'],
                },
            ],
        });

        return res.json(Service);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            title: Yup.string().required(),
            description: Yup.string().required(),
            note: Yup.string(),
            location_id: Yup.number(),
            workshop_id: Yup.number().required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
        // Dados do serviço
        const {
            date,
            title,
            description,
            note,
            location_id,
            workshop_id,
            provider,
        } = req.body;

        // Usuário que gerou o serviço
        const user_id = req.userId;
        // Criando informações no db
        const Service = await Services.create({
            date,
            title,
            description,
            note,
            location_id,
            workshop_id,
            user_id,
            provider_id: provider ? req.userId : null,
        });

        return res.json({ msg: 'Cadastro realizado com sucesso!', Service });
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            status: Yup.string(),
            title: Yup.string(),
            description: Yup.string(),
            note: Yup.string(),
            location_id: Yup.number(),
            company_id: Yup.number(),
            workshop_id: Yup.number(),
            provider_id: Yup.number(),
            user_id: Yup.number(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ msg: 'Erro de validação nos campos.' });
        }
        // Serviço a ser atualizado
        const { id } = req.params;
        // Atualizando informações no db
        const Exists = await Services.findByPk(id);

        if (!Exists) {
            return res.json({ msg: 'Não existe registro a ser atualizado' });
        }

        const service = await Exists.update(req.body);

        return res.json({ msg: 'Alteração realizada com sucesso', service });
    }
}

export default new ServiceController();
