const pessoa = require('../models/pessoa');
const unidadeSaude = require('../models/unidadeSaude');

exports.add = async (request, response) => {
    try {

        const {
            nome,
            cpf,
            data_nascimento,
            telefone,
            grupo_prioritario,
            endereco,
            email,
            // unidadeSaude
        } = request.body;

        pessoa.find((err, pessoas) => {
            if (err) {
                console.log("Não foi possível recuperar o usuario!");
                response.json({
                    status: "erro",
                    message: "Não foi possível recuperar os usuarios e portanto inserir um novo usuario!"
                });
            }

            pessoas.map(item => {
                if (cpf === item.cpf) {
                    response.json({
                        status: "erro",
                        message: `A pessoa ${nome} já está cadastrada com o cpf ${cpf}`
                    });
                    return;
                }
            });

            let newPessoa = new pessoa({
                nome,
                cpf,
                data_nascimento,
                telefone,
                grupo_prioritario,
                endereco,
                email,
                // unidadeSaude
            });

            newPessoa.save((erro) => {
                if (erro) {
                    response.send({
                        status: "erro",
                        message: erro
                    });
                } else {
                    response.send({
                        status: "ok",
                        message: `Usuário ${request.body.nome}, inserida com sucesso!`
                    });
                }
            })
        });


    } catch (error) {
        console.log(error);
        response.status(400).json({ error: "Erro ao criar usuário" });
    }

}

exports.list = async (request, response) => {

    const { id } = request.params;

    if (id) {
        pessoa.findById(id, function (err, pessoa) {
            if (err || !pessoa) {
                console.log(`Não foi possivel recuperar a pessoa de id: ${id}`);
                response.json({
                    status: "erro",
                    message: `Não foi possivel recuperar a pessoa de id: ${id}`
                });
            } else {
                response.json({
                    status: "ok",
                    pessoa: pessoa
                });
            }

        });
    } else {
        pessoa.find(function (err, pessoas) {
            if (err) {
                console.log("Não foi possível recuperar as pessoas!");
                response.json({
                    status: "erro",
                    message: "Não foi possível recuperar as pessoas!"
                });
            } else {
                response.json({
                    pessoas: pessoas
                });
            }
        });

    }
};


exports.update = async (request, response) => {
    const { id } = request.params;

    pessoa.findById(id, (erro, pessoa) => {
        if (erro || !pessoa) {
            console.log("Não foi possível recuperar a pessoa!");
            response.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de id ${id} para atualização`
            });
        } else {

            const {
                nome,
                cpf,
                data_nascimento,
                telefone,
                grupo_prioritario,
                endereco,
                email,
                // unidadeSaude
            } = request.body;

            pessoa.nome = nome;
            pessoa.cpf = cpf;
            pessoa.data_nascimento = data_nascimento;
            pessoa.telefone = telefone;
            pessoa.grupo_prioritario = grupo_prioritario;
            pessoa.endereco = endereco;
            pessoa.email = email;

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
}

exports.delete = async (request, response) => {
    const { id } = request.params;

    pessoa.deleteOne({
        _id: id
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