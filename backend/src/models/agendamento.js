const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const agendamentoSchema = Schema({
    data_hora: {
        type: Schema.Types.Date,
        required: true
    },
    necessidades_especiais: {
        type: Schema.Types.Boolean,
        required: true
    },
    observacoes: {
        type: Schema.Types.String,
        required: false
    },
    pessoa: {
        type: Schema.Types.ObjectId,
        ref: "pessoa",
        required: true
    },
    unidade_saude: {
        type: Schema.Types.ObjectId,
        ref: "unidadeSaude",
        required: true
    },
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}