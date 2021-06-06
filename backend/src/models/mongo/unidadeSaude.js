const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const unidadeSaudeSchema = Schema({
    nome: {
        type: Schema.Types.String,
        required: true
    },
    descricao: {
        type: Schema.Types.String,
        required: true
    },
    endereco: {
        type: Schema.Types.String,
        required: true
    },
    telefone: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    latlong: {
        type: Schema.Types.String,
        required: true
    },
    pessoa: [{
        type: Schema.Types.ObjectId,
        ref: 'pessoa'
    }]
});

let UnidadeSaude = module.exports = mongoose.model('unidadeSaude', unidadeSaudeSchema);

module.exports.get = function (callback, limit) {
    UnidadeSaude.find(callback).limit(limit);
}