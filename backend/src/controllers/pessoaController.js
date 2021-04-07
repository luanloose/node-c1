const pessoaModel = require('../models/pessoa');
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
            unidade_saude
        } = request.body;

        unidadeSaude.findById(unidade_saude, function (erro, unidadeS) {
            if (erro || !unidadeS) {
                response.status(200).json({
                    status: "erro",
                    message: `Não foi possivel recuperar a unidade de saude de id: ${unidade_saude}`
                });
                return;
            } else {
                pessoaModel.find((err, pessoas) => {
                    if (err) {
                        response.status(200).json({
                            status: "erro",
                            message: "Não foi possível recuperar os usuarios e portanto inserir um novo usuario!"
                        });
                        return;
                    }

                    pessoas.map(item => {
                        if (cpf === item.cpf) {
                            response.status(200).json({
                                status: "erro",
                                message: `A pessoa ${nome} já está cadastrada com o cpf ${cpf}`
                            });
                            return;
                        }
                    });

                    let newPessoa = new pessoaModel({
                        nome,
                        cpf,
                        data_nascimento,
                        telefone,
                        grupo_prioritario,
                        endereco,
                        email,
                        unidade_saude: unidadeS._id
                    });

                    newPessoa.save((erro) => {
                        if (erro) {
                            response.status(200).json({
                                status: "erro",
                                message: erro
                            });
                            return;
                        } else {
                            response.status(200).json({
                                status: "success",
                                message: `Usuário ${nome}, inserida com sucesso!`
                            });
                            return;
                        }
                    })
                });
            }
        });
    } catch (error) {
        response.status(400).json({ error: "Erro ao criar pessoa" });
    }

}

exports.list = async (request, response) => {

    const { id } = request.params;

    if (id) {
        if (id.length != 12 && id.length != 24 || id === null) {
            response.status(200).json({
                status: "erro",
                message: `${id} deve conter 12 ou 16 caracteres!`
            });
            return;
        }

        const pessoa = await pessoaModel.findById(id);

        if (!pessoa) {
            response.status(200).json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de id ${id}`
            });
            return;
        }

        response.status(200).json({
            status: "success",
            pessoa: pessoa
        });
        return;

    } else {
        pessoaModel.find(function (erro, pessoas) {
            if (erro) {
                response.status(200).json({
                    status: "erro",
                    message: "Não foi possível recuperar as pessoas!"
                });
                return;
            } else {
                response.status(200).json({
                    pessoas: pessoas
                });
                return;
            }
        });
    }
};


exports.update = async (request, response) => {
    const { id } = request.params;

    if (id.length != 12 && id.length != 24 || id === null) {
        response.status(200).json({
            status: "erro",
            message: `${id} deve conter 12 ou 16 caracteres!`
        });
        return;
    }

    const pessoa = await pessoaModel.findById(id);

    if (!pessoa) {
        response.status(200).json({
            status: "erro",
            message: `Não foi possível recuperar a pessoa de id ${id}`
        });
        return;
    }

    pessoaModel.findById(id, (erro, pessoa) => {
        if (erro || !pessoa) {
            response.status(200).json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de id ${id} para atualização`
            });
            return;
        } else {

            const {
                nome,
                cpf,
                data_nascimento,
                telefone,
                grupo_prioritario,
                endereco,
                email,
                unidade_saude
            } = request.body;

            pessoa.nome = nome;
            pessoa.cpf = cpf;
            pessoa.data_nascimento = data_nascimento;
            pessoa.telefone = telefone;
            pessoa.grupo_prioritario = grupo_prioritario;
            pessoa.endereco = endereco;
            pessoa.email = email;
            pessoa.unidade_saude = unidade_saude;

            pessoa.save((err => {
                if (err) {
                    response.status(200).json({
                        status: "erro",
                        message: err
                    });
                    return;
                } else {
                    response.status(200).json({
                        status: "success",
                        message: `Pessoa ${pessoa.nome} atualizada com sucesso!`,
                        pessoa: pessoa
                    });
                    return;
                }
            }));
        }
    });
}

exports.delete = async (request, response) => {
    const { id } = request.params;

    if (id.length != 12 && id.length != 24 || id === null) {
        response.status(200).json({
            status: "erro",
            message: `${id} deve conter 12 ou 16 caracteres!`
        });
        return;
    }

    const pessoa = await pessoaModel.findById(id);

    if (!pessoa) {
        response.status(200).json({
            status: "erro",
            message: `Não foi possível recuperar a pessoa de id ${id}`
        });
        return;
    }

    pessoaModel.deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            response.status(200).json({
                status: "erro",
                message: "Houve um erro ao deletar pessoa"
            });
            return;
        } else {
            response.status(200).json({
                status: "success",
                message: `Pessoa deletado com sucesso!`
            });
            return;
        }
    });
}