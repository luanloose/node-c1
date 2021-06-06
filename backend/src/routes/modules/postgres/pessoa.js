const { Router } = require('express');

const routes = Router();

const PessoaController = require('../../../controllers/postgres/pessoaController');

routes.post('/add', PessoaController.add);
routes.get('/', PessoaController.list);
routes.get('/:id', PessoaController.list);
routes.put('/:id', PessoaController.update);
routes.delete('/:id', PessoaController.delete);

module.exports = routes;