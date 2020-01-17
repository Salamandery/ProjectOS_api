//import * as Yup from 'yup';
import { startOfMonth } from 'date-fns';
// Sequelize options
import { Op } from 'sequelize';
// Modelo do usuário
import User from '../models/Users';
// Modelo de Serviço
import Services from '../models/Services';
// Modelo de Usuário e Serviço
import UserServices from '../models/UserService';
// Modelo de localização
import Locations from '../models/Locations';
// Modelo de Setores
import Sector from '../models/Sector';
// Modelo de Arquivos
import Files from '../models/Files';
// Modelo de oficina
import Workshops from '../models/Workshop';

class UserServiceController {
    async index(req, res) {
        // Se Usuário é provedor
        const isUser = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        // Erro caso não seja ou não exista
        if (!isUser) {
            return res
                .status(401)
                .json({ msg: 'Usuário não é provedor de serviço.' });
        }

        // data inicial do mês atual
        const dateInitial = startOfMonth(new Date());
        const Now = new Date();

        // Listando Serviços
        const Service = await UserServices.findAll({
            where: {
                [Op.or]: [
                    {
                        user_id: {
                            [Op.eq]: req.userId,
                        },
                    },
                    {
                        user_id: {
                            [Op.ne]: req.userId,
                        },
                    },
                ],
            },
            attributes: [
                'service_id',
                'id',
                'user_id',
                'date_initial',
                'date_final',
                'note',
                'min_to_resolve',
            ],
            include: [
                {
                    model: Services,
                    as: 'service',
                    attributes: [
                        'title',
                        'status',
                        'date',
                        'description',
                        'note',
                    ],
                    where: {
                        [Op.or]: [
                            {
                                provider_id: {
                                    [Op.eq]: req.userId,
                                },
                            },
                            {
                                provider_id: {
                                    [Op.ne]: req.userId,
                                },
                            },
                        ],
                        date: {
                            [Op.gte]: dateInitial,
                            [Op.lte]: Now,
                        },
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
                            model: User,
                            as: 'user',
                            attributes: ['login', 'email', 'name'],
                        },
                        {
                            model: User,
                            as: 'provider',
                            attributes: ['login', 'email', 'name'],
                        },
                        {
                            model: User,
                            as: 'last_user',
                            attributes: ['login', 'email', 'name'],
                        },
                        {
                            model: Files,
                            as: 'file',
                            attributes: ['name', 'path', 'url'],
                        },
                        {
                            model: Workshops,
                            as: 'workshop',
                            attributes: ['id', 'description'],
                            where: {
                                id: {
                                    [Op.in]: isUser.workshops,
                                },
                                company_id: req.comp,
                            },
                        },
                    ],
                },
            ],
        });

        return res.json(Service);
    }

    async store(req, res) {
        // Se Usuário é provedor
        const isUser = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        // Erro caso não seja ou não exista
        if (!isUser) {
            return res
                .status(401)
                .json({ msg: 'Usuário não é provedor de serviço.' });
        }

        return res.json();
    }

    async update(req, res) {
        // Se Usuário é provedor
        const isUser = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        // Erro caso não seja ou não exista
        if (!isUser) {
            return res
                .status(401)
                .json({ msg: 'Usuário não é provedor de serviço.' });
        }

        return res.json();
    }

    async delete(req, res) {
        // Se Usuário é provedor
        const isUser = await User.findOne({
            where: {
                id: req.userId,
                provider: true,
            },
        });

        // Erro caso não seja ou não exista
        if (!isUser) {
            return res
                .status(401)
                .json({ msg: 'Usuário não é provedor de serviço.' });
        }

        return res.json();
    }
}

export default new UserServiceController();
