const express = require('express');
const app = express();

const pessoa = require('./modules/pessoa');
const agendamento = require('./modules/agendamento');
const unidadeSaude = require('./modules/unidadeSaude');

app.use('/api/pessoa', pessoa);
app.use('/api/agendamento', agendamento);
app.use('/api/unidadeSaude', unidadeSaude);

module.exports = app;