import * as Yup from 'yup';
import moment from 'moment-timezone';
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
// Modelo de Solução
import Solutions from '../models/Solutions';

class UserServiceController {
    async show(req, res) {
        // Se Usuário é provedor
        const isUser = await User.findOne({
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
        // Parametros do serviço
        const { service_id } = req.params;
        // Listando Serviços
        const Service = await UserServices.findAll({
            where: {
                service_id,
                user_id: req.userId,
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
                    include: [
                        {
                            model: Locations,
                            as: 'location',
                            attributes: ['id', 'description'],
                            include: {
                                model: Sector,
                                as: 'sector',
                                attributes: ['id', 'description'],
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
                        },
                    ],
                },
                {
                    model: Solutions,
                    as: 'solution',
                    attributes: ['id', 'description'],
                    where: {
                        active: true,
                    },
                },
            ],
        });

        return res.json(Service);
    }
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
            return res.json({
                status: 401,
                msg: 'Usuário não é provedor de serviço.',
            });
        }
        // Listando Serviços
        const Service = await UserServices.findAll({
            where: {
                user_id: req.userId,
            },
        });

        return res.json(Service);
    }

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            note: Yup.string(),
            solution_id: Yup.number()
                .moreThan(0)
                .required(),
            service_id: Yup.number().required(),
            date_initial: Yup.date().required(),
            date_final: Yup.date().required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }
        // Se Usuário é provedor
        const isUser = await User.findOne({
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
        // Dados do serviço
        const {
            date_initial,
            date_final,
            note,
            solution_id,
            service_id,
        } = req.body;
        // Usuário que gerou o serviço
        const user_id = req.userId;
        // Minutos trabalhado
        const min_to_resolve = moment(date_final).diff(
            moment(date_initial),
            'minutes'
        );
        // Criando informações no db
        const UserService = await UserServices.create({
            date_initial: moment.tz(date_initial, process.env.TZ).format(),
            date_final: moment.tz(date_final, process.env.TZ).format(),
            note,
            solution_id,
            service_id,
            user_id,
            min_to_resolve,
        });

        return res.json(UserService);
    }

    async update(req, res) {
        // Validação
        const schema = Yup.object().shape({
            note: Yup.string(),
            solution_id: Yup.number().required(),
            service_id: Yup.number().required(),
            date_initial: Yup.date().required(),
            date_final: Yup.date().required(),
        });
        // Se campos não forem válidos gera erros
        if (!(await schema.isValid(req.body))) {
            return res.json({
                status: 400,
                msg: 'Erro de validação nos campos.',
            });
        }
        // Se Usuário é provedor
        const isUser = await User.findOne({
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
        // Parametro do serviço
        const { id } = req.params;
        // Dados do serviço
        const {
            date_initial,
            date_final,
            note,
            solution_id,
            service_id,
        } = req.body;

        // Usuário que gerou o serviço
        const user_id = req.userId;
        // Buscando informações do serviço
        const UserService = await UserServices.findByPk(id);
        // Caso serviço não exista
        if (!UserService) {
            return res.json({
                status: 401,
                msg: 'Serviço não encontrado.',
            });
        }
        // Atualizando informações do serviço
        UserService.update({
            date_initial,
            date_final,
            note,
            solution_id,
            service_id,
            user_id,
        });

        return res.json(UserService);
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
            return res.json({
                status: 401,
                msg: 'Usuário não é provedor de serviço.',
            });
        }
        // Parametro do serviço
        const { id } = req.params;
        // Buscando informações do serviço
        const UserService = await UserServices.findByPk(id);
        // Caso serviço não exista
        if (!UserService) {
            return res.json({
                status: 401,
                msg: 'Serviço não encontrado.',
            });
        }

        return res.json();
    }
}

export default new UserServiceController();
