const agendamentoModel = require('../models/agendamento');

module.exports = {

    // Adicionar um novo agendamento
    async adicionar(request, response) {

        const {
            data_hora_agendamento,
            necessidades_especiais,
            observacoes_agendamento,
            pessoa,
            //unidadeSaude,
        } = request.body;

        // Recuperar todas os agendamentos cadastradas no banco
        agendamentoModel.find((err, agendamentos) => {
            if (err) {
                console.log("Não foi possível recuperar os agendamentos!");
                response.json({
                    status: "erro",
                    message: "Não foi possível recuperar os agendamentos e portanto inserir um novo agendamento!"
                });
            }

            // Verificar se ja existe um agendamento cadastrado para a mesma pessoa
            agendamentos.map(item => {
                if (pessoa === item.pessoa) {
                    response.json({
                        status: "erro",
                        message: `Já existe um agendamento para essa pessoa`
                    });
                    return;
                }
            });

            var data = new Date(data_hora_agendamento);

            // Cadastrar agendamento
            let agendamento = new agendamentoModel({
                data_hora_agendamento: data,
                necessidades_especiais,
                observacoes_agendamento,
                pessoa,
                //unidadeSaude,
            });

            agendamento.save((erro) => {
                if (erro) {
                    response.send({
                        status: "erro",
                        message: erro
                    });
                } else {
                    response.send({
                        status: "ok",
                        message: `Agendamento inserido com sucesso!`
                    });
                }
            });
        });
    },

    // Listar agendamentos
    async listar(request, response) {
        agendamentoModel.find(function (err, agendamentos) {
            if (err) {
                console.log("Não foi possível recuperar os agendamentos!");
                response.json({
                    status: "erro",
                    message: "Não foi possível recuperar os agendamentos!"
                });
            } else {
                response.json({
                    status: "ok",
                    agendamentos: agendamentos
                });
            }

        }).populate('pessoa');
    },

    // Obter agendamento por id
    async listarPorID(request, response) {
        let id_agendamento = request.query.id;

        agendamentoModel.findById(id_agendamento, function (err, agendamento) {
            if (err || !agendamento) {
                console.log(`Não foi possivel recuperar o agendamento de id: ${id_agendamento}`);
                response.json({
                    status: "erro",
                    message: `Não foi possivel recuperar o agendamento de id: ${id_agendamento}`
                });
            } else {
                response.json({
                    status: "ok",
                    agendamento: agendamento
                });
            }

        }).populate('pessoa');
    },

    // Editar um agendamento
    async atualizar(request, response) {
        let id_pessoa = request.query.id;

        agendamentoModel.findById(id_pessoa, (erro, pessoa) => {
            if (erro || !pessoa) {
                console.log("Não foi possível recuperar a pessoa!");
                response.json({
                    status: "erro",
                    message: `Não foi possível recuperar a pessoa de id ${id_pessoa} para atualização`
                });
            } else {

                const {
                    nome,
                    cpf_pessoa,
                    data_nascimento,
                    telefone_pessoa,
                    grupo_prioritario,
                    endereco_pessoa,
                    email_pessoa,
                    // unidadeSaude
                } = request.body;

                pessoa.nome = nome;
                pessoa.cpf_pessoa = cpf_pessoa;
                pessoa.data_nascimento = data_nascimento;
                pessoa.telefone_pessoa = telefone_pessoa;
                pessoa.grupo_prioritario = grupo_prioritario;
                pessoa.endereco_pessoa = endereco_pessoa;
                pessoa.email_pessoa = email_pessoa;

                console.log(pessoa);

                pessoa.save((err => {
                    if (err) {
                        response.json({
                            status: "erro",
                            message: err
                        });
                    } else {
                        response.json({
                            status: "ok",
                            message: `Pessoa ${pessoa.nome} atualizada com sucesso!`,
                            novaPessoa: pessoa
                        });
                    }
                }));
            }
        });
    },

    // Remover agendamento
    async remover(request, response) {
        let id_agendamento = request.query.id;

        agendamentoModel.deleteOne({
            _id: id_agendamento
        }, (err) => {
            if (err) {
                response.json({
                    status: "erro",
                    message: "Houve um erro ao deletar agendamento"
                });
            } else {
                response.json({
                    status: "ok",
                    message: `Agendamento deletado com sucesso!`
                });
            }
        });
    }
}