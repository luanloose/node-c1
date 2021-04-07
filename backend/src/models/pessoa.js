const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const pessoaSchema = new Schema({
    nome: {
        type: Schema.Types.String,
        required: true
    },
    cpf: {
        type: Schema.Types.String,
        required: true
    },
    data_nascimento: {
        type: Schema.Types.String,
        required: true
    },
    telefone: {
        type: Schema.Types.String,
        required: true
    },
    grupo_prioritario: {
        type: Schema.Types.Boolean,
        required: true
    },
    endereco: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    agendamento: {
        type: Schema.Types.ObjectId, 
        ref: 'agendamento', 
        require: false
    },
    unidade_saude: {
        type: Schema.Types.ObjectId, 
        ref: 'unidadeSaude', 
        require: true
    }
});

let Pessoa = module.exports = mongoose.model('pessoa', pessoaSchema);

module.exports.get = function(callback, limit){
    Pessoa.find(callback).limit(limit);
}