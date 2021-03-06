import formatDate from '../utils/formatDate';
import { startOfMonth } from 'date-fns';
// Sequelize options
import { Op } from 'sequelize';
// Modelo
// Serviço
import Services from '../models/Services';
// Usuário
import Users from '../models/Users';
// Localização
import Locations from '../models/Locations';
// Setor
import Sector from '../models/Sector';
// Oficinas
import Workshops from '../models/Workshop';
// Empresa
import Company from '../models/Company';

class ScheduleController {
    async index(req, res) {
        // Se Usuário é provedor
        const isUser = await Users.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        // Erro caso não seja ou não exista
        if (!isUser) {
            return res.json({
                status: 401,
                msg: 'Usuário não é provedor de serviço.',
            });
        }
        // Se provedor não for nulo
        const { provider } = req.params;
        // data inicial do mês atual
        const dateInitial = startOfMonth(new Date());
        const Now = new Date();

        let Service = {};
        let where = {};

        if (provider == 1) {
            // Listando Seriços do usuário
            where = {
                provider_id: req.userId,
                date: { [Op.gte]: dateInitial, [Op.lte]: Now },
                workshop_id: { [Op.in]: isUser.workshops },
            };
        } else if (provider == 2) {
            // Listando Seriços do usuário
            where = {
                date: { [Op.gte]: dateInitial, [Op.lte]: Now },
                workshop_id: { [Op.in]: isUser.workshops },
            };
        } else {
            // Listando Seriços com prestador nulo
            where = {
                provider_id: null,
                date: { [Op.gte]: dateInitial, [Op.lte]: Now },
                workshop_id: { [Op.in]: isUser.workshops },
            };
        }

        Service = await Services.findAll({
            attributes: [
                'id',
                'title',
                'status',
                'date',
                'description',
                'note',
            ],
            where: {
                provider_id: req.userId,
                date: { [Op.gte]: dateInitial, [Op.lte]: Now },
                workshop_id: { [Op.in]: isUser.workshops },
            },
            order: [['date', 'desc']],
            where,
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
                        include: {
                            model: Company,
                            as: 'company',
                            attributes: ['id', 'description'],
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
                    as: 'user',
                    attributes: ['name', 'login', 'email'],
                },
                {
                    model: Users,
                    as: 'provider',
                    attributes: ['name', 'login', 'email'],
                },
            ],
        });

        // Data formatada
        Service = Service.map(srv => ({
            id: srv.id,
            status: srv.status,
            date: srv.date,
            title: srv.title,
            description: srv.description,
            user: srv.user,
            provider: srv.provider,
            location: srv.location,
            formattedDate: formatDate(srv.date),
        }));

        return res.json(Service);
    }

    async update(req, res) {
        // Se Usuário é provedor
        const isUser = await Users.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        // Erro caso não seja ou não exista
        if (!isUser) {
            return res.json({
                status: 401,
                msg: 'Usuário não é provedor de serviço.',
            });
        }
        // Se provedor não for nulo
        const { id, provider_id } = req.params;

        // Atualizando informações no db
        const Exists = await Services.findByPk(id);

        if (!Exists) {
            return res.json({
                status: 400,
                msg: 'Não existe registro a ser atualizado',
            });
        }

        if (provider_id) {
            if (provider_id == 0) {
                return res.json({ status: 401, msg: 'Provedor inválido.' });
            }
            // Transferência de provedor de serviço
            const service = await Exists.update({
                provider_id,
                user_id_lastupdate: req.userId,
            });

            return res.json(service);
        }

        // Recebendo/Assumindo ordem de serviço
        const service = await Exists.update({
            provider_id: req.userId,
            user_id_lastupdate: req.userId,
        });

        return res.json(service);
    }
}

export default new ScheduleController();
