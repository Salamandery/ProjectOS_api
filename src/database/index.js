import Sequelize from 'sequelize';
// Models
// Usuários
import User from '../app/models/Users';
// Arquivos
import Files from '../app/models/Files';
// Serviços
import Services from '../app/models/Services';
// Setor
import Sector from '../app/models/Sector';
// Localização
import Locations from '../app/models/Locations';
// Soluções
import Solutions from '../app/models/Solutions';
// Empresa
import Company from '../app/models/Company';
// Oficina
import Workshops from '../app/models/Workshop';
// Usuários e Serviços
import UserService from '../app/models/UserService';

// Configurações do db
import conf from '../config/database';

// Lista de models
const models = [
    User,
    Files,
    Services,
    UserService,
    Company,
    Sector,
    Locations,
    Solutions,
    Workshops
];

class Database {
    constructor() {
        // Inicializando
        this.init();
    }

    init() {
        // Criando conexão
        this.connection = new Sequelize(conf);
        // Passando conexão para os models
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
