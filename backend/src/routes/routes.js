const express = require('express');
const app = express();

const pessoaMongo = require('./modules/mongo/pessoa');
const agendamentoMongo = require('./modules/mongo/agendamento');
const unidadeSaudeMongo = require('./modules/mongo/unidadeSaude');

const pessoa = require('./modules/postgres/pessoa');
const agendamento = require('./modules/postgres/agendamento');
const unidadeSaude = require('./modules/postgres/unidadeSaude');

const login = require('./modules/postgres/login');

app.use('/api/pessoa', pessoa);
app.use('/api/agendamento', agendamento);
app.use('/api/unidadeSaude', unidadeSaude);

app.use('/api/pessoa-mongo', pessoaMongo);
app.use('/api/agendamento-mongo', agendamentoMongo);
app.use('/api/unidadeSaude-mongo', unidadeSaudeMongo);

app.use('/api/login', login);

module.exports = app;