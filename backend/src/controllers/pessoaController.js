const pessoaModel = require('../models/pessoa');

module.exports = {

    // Adicionar uma nova pessoa
    async adicionarPessoa(request, response) {

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

        // Recuperar todas as pessoas cadastradas no banco
        pessoaModel.find((err, pessoas) => {
            if (err) {
                console.log("Não foi possível recuperar as pessoas!");
                response.json({
                    status: "erro",
                    message: "Não foi possível recuperar as pessoas e portanto inserir uma nova pessoa!"
                });
            }

            // Verificar se ja existe uma pessoa cadastrada com o mesmo cpf
            pessoas.map(item => {
                if (cpf_pessoa === item.cpf_pessoa) {
                    response.json({
                        status: "erro",
                        message: `A pessoa ${nome} já está cadastrada com o cpf ${cpf_pessoa}`
                    });
                    return;
                }
            });

            // Cadastrar pessoa
            let pessoa = new pessoaModel({
                nome,
                cpf_pessoa,
                data_nascimento,
                telefone_pessoa,
                grupo_prioritario,
                endereco_pessoa,
                email_pessoa,
                // unidadeSaude
            });

            pessoa.save((erro) => {
                if (erro) {
                    response.send({
                        status: "erro",
                        message: "Não foi possível inserir pessoa."
                    });
                } else {
                    response.send({
                        status: "ok",
                        message: `Pessoa ${nome} inserida com sucesso!`
                    });
                }
            });
        });
    },

    // Listar pessoas
    async listarPessoas(request, response) {
        pessoaModel.find(function (err, pessoas) {
            if (err) {
                console.log("Não foi possível recuperar as pessoas!");
                response.json({
                    status: "erro",
                    message: "Não foi possível recuperar as pessoas!"
                });
            } else {
                response.json({
                    status: "ok",
                    pessoas: pessoas
                });
            }

        });
    },

    // Obter pessoa por id
    async listarPessoaPorID(request, response) {
        let id_pessoa = request.query.id;

        pessoaModel.findById(id_pessoa, function (err, pessoa) {
            if (err || !pessoa) {
                console.log(`Não foi possivel recuperar a pessoa de id: ${id_pessoa}`);
                response.json({
                    status: "erro",
                    message: `Não foi possivel recuperar a pessoa de id: ${id_pessoa}`
                });
            } else {
                response.json({
                    status: "ok",
                    pessoa: pessoa
                });
            }

        });
    },

    // Editar uma pessoa
    async atualizarPessoa(request, response) {
        let id_pessoa = request.query.id;

        pessoaModel.findById(id_pessoa, (erro, pessoa) => {
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

    // Remover pessoa
    async removerPessoa(request, response) {
        let id_pessoa = request.query.id;

        pessoaModel.deleteOne({
            _id: id_pessoa
        }, (err) => {
            if (err) {
                response.json({
                    status: "erro",
                    message: "Houve um erro ao deletar pessoa"
                });
            } else {
                response.json({
                    status: "ok",
                    message: `Pessoa deletado com sucesso!`
                });
            }
        });
    }
}