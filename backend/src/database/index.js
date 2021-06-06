const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const UnidadeSaude = require('../models/postgres/UnidadeSaude');
const Pessoa = require('../models/postgres/Pessoa');
const Agendamento = require('../models/postgres/Agendamento');

const connection = new Sequelize(dbConfig);

UnidadeSaude.init(connection);
Pessoa.init(connection);
Agendamento.init(connection);

UnidadeSaude.associate(connection.models);
Pessoa.associate(connection.models);
Agendamento.associate(connection.models);

module.exports = connection;