const { Router } = require('express');

const routes = Router();

const AgendamentoController = require('../../../controllers/postgres/agendamentoController');

routes.post('/add', AgendamentoController.add);
routes.get('/', AgendamentoController.list);
routes.get('/:id', AgendamentoController.list);
routes.put('/:id', AgendamentoController.update);
routes.delete('/:id', AgendamentoController.delete);

module.exports = routes;