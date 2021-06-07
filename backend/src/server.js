require('dotenv').config({
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
});
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const routes = require('./routes/routes')

const port = 3000;

require('./database');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const strConnection = process.env.NODE_ENV === 'development' ?
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin` :
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}.wbhls.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(strConnection, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', () => console.log("Banco de Dados Mongo conectado com sucesso"));

app.use(routes);
app.listen(port);