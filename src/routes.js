import { Router } from 'express';
import multer from 'multer';
// Configuração do multer
import conf from './config/multer';
// Middleware authentication
import auth from './app/middlewares/auth';

// Controllers
// User
import UserController from './app/controllers/UserController';
// Provedores
import ProviderController from './app/controllers/ProviderController';
// Session
import SessionController from './app/controllers/SessionController';
// File
import FileController from './app/controllers/FileController';
// Serviços
import ServiceController from './app/controllers/ServiceController';
// Serviços agendado
import ScheduleController from './app/controllers/ScheduleController';
// Usuário e Serviços
import UserServiceController from './app/controllers/UserServiceController';
// Soluções
import SolutionController from './app/controllers/SolutionController';
// Setores
import SectorController from './app/controllers/SectorController';
// Location
import LocationController from './app/controllers/LocationController';
// Oficina
import WorkshopController from './app/controllers/WorkshopController';
// Empresa
import CompanyController from './app/controllers/CompanyController';

// Iniciando rotas
const routes = new Router();
// Iniciando gerenciador de arquivo
const upload = multer(conf);

// Rotas
// POSTS SEM SESSÃO
// Definição de sessão
routes.post('/session', SessionController.store);

// Necessário autenticar antes de navegar abaixo
routes.post('/users', UserController.store);
routes.use(auth);

// POSTS COM SESSÃO DEFINIDA
// Cadastro de Usuários
routes.post('/user', UserController.store);
// Cadastro de Arquivos
routes.post('/file', upload.single('file'), FileController.store);
// Cadastro de Serviço
routes.post('/service', ServiceController.store);
// Cadastro de Usuário e Serviço
routes.post('/user_service', UserServiceController.store);
// Cadastro de Soluções
routes.post('/solution', SolutionController.store);
// Cadastro de Setores
routes.post('/sector', SectorController.store);
// Cadastro de Localidade
routes.post('/location', LocationController.store);
// Cadastro de Oficina
routes.post('/workshop', WorkshopController.store);
// Cadastro de Oficina
routes.post('/company', CompanyController.store);

// GET COM SESSÃO DEFINIDA
// Listagem de Usuários
routes.get('/users', UserController.index);
// Listagem de Usuários provedores
routes.get('/providers', ProviderController.index);
// Listagem de Serviço
routes.get('/services', ServiceController.index);
// Listagem de Serviço agendados
routes.get('/schedules/', ScheduleController.index);
// Listagem de Serviço agendados por provedor
routes.get('/schedules/:provider', ScheduleController.index);
// Listagem de Usuário e Serviço
routes.get('/user_services', UserServiceController.index);
// Listagem de Soluções
routes.get('/solutions', SolutionController.index);
// Listagem de Setores
routes.get('/sectors', SectorController.index);
// Listagem de Localidade
routes.get('/locations/:sectorId', LocationController.index);
// Listagem de Oficina
routes.get('/workshops', WorkshopController.index);
// Listagem de Empresa
routes.get('/companies', CompanyController.index);

// PUT COM SESSÃO DEFINIDA
// Atualização do Usuário
routes.put('/user/', UserController.update);
// Atualização do Usuário
routes.put('/user/:id', UserController.update);
// Atualização de Serviço
routes.put('/service/:id', ServiceController.update);
// Atualizaçao do agendamento
routes.put('/schedule/:id', ScheduleController.update);
// Transferência do agendamento
routes.put('/schedule/:id/:provider_id', ScheduleController.update);
// Atualização de Usuário e Serviço
routes.put('/user_service/:id', UserServiceController.update);
// Atualização de Soluções
routes.put('/solution/:id', SolutionController.update);
// Atualização de Setores
routes.put('/sector/:id', SectorController.update);
// Atualização de Localidade
routes.put('/location/:id', LocationController.update);
// Atualização de Oficina
routes.put('/workshop/:id', WorkshopController.update);
// Atualização de Empresa
routes.put('/company/:id', CompanyController.update);

module.exports = routes;
