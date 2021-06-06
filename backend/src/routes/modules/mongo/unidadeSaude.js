const { Router } = require('express');

const routes = Router();

const unidadeSaudeController = require('../../../controllers/mongo/unidadeSaudeController');

routes.post('/add', unidadeSaudeController.add);

routes.get('/', unidadeSaudeController.list);

routes.get('/:id', unidadeSaudeController.list);

routes.put('/:id', unidadeSaudeController.update);

routes.delete('/:id', unidadeSaudeController.delete);

module.exports = routes;