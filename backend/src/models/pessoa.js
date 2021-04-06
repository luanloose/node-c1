const mongoose = require('mongoose');

const pessoaSchema = new mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cpf: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_nascimento: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    endereco: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    agendamento: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'agendamento', 
        require: false
    }
});

let Pessoa = module.exports = mongoose.model('pessoa', pessoaSchema);

module.exports.get = function(callback, limit){
    Pessoa.find(callback).limit(limit);
}