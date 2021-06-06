const express = require('express');
const app = express();

const pessoa = require('./modules/mongo/pessoa');
const agendamento = require('./modules/mongo/agendamento');
const unidadeSaude = require('./modules/mongo/unidadeSaude');

app.use('/api/pessoa', pessoa);
app.use('/api/agendamento', agendamento);
app.use('/api/unidadeSaude', unidadeSaude);

module.exports = app;