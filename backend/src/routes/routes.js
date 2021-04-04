const { Router } = require('express');

const routes = Router();

const PessoaController = require('../controllers/pessoaController');
const AgendamentoController = require('../controllers/agendamentoController');

// * Rotas de pessoas
routes.post('/addPessoa', PessoaController.adicionarPessoa);

routes.get('/listarPessoa', PessoaController.listarPessoas);

routes.get('/getPessoa', PessoaController.listarPessoaPorID);

routes.put('/attPessoa', PessoaController.atualizarPessoa);

routes.delete('/deletePessoa', PessoaController.removerPessoa);

// * Rotas de agendamentos

routes.post('/addAgendamento', AgendamentoController.adicionar);

routes.get('/listarAgendamento', AgendamentoController.listar);

routes.get('/getAgendamento', AgendamentoController.listar);

routes.put('/attAgendamento', AgendamentoController.atualizar);

routes.delete('/deleteAgendamento', AgendamentoController.remover);

module.exports = routes;