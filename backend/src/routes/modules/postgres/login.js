const { Router } = require('express');

const routes = Router();

const LoginController = require('../../../controllers/postgres/LoginController');

routes.post('/', LoginController.login);

module.exports = routes;