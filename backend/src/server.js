const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const routes = require('./routes/routes')

const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Conectar ao banco mongodb
// ! configurar o nome do banco com o nome do container -mongo-trabalho-c1
mongoose.connect(
    `mongodb://root:faesa123@mongo-trabalho-c1:27017/devwebII?authSource=admin`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
mongoose.connection.once('open', () => console.log("Banco de Dados Mongo conectado com sucesso"));

// Configura o arquivo de rotas
app.use(routes);

// Inicializa o servidor
app.listen(port);