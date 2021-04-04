const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    necessidades_especiais: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    observacoes_agendamento: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pessoa",
        required: true
    },
    // unidadeSaude: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "unidadeSaude",
    //     required: true
    // },
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}