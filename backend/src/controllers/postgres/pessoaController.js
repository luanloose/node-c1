const pessoaModel = require('../../models/postgres/Pessoa');
const unidadeSaude = require('../../models/postgres/UnidadeSaude');

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
            unidade_saude_id
        } = request.body;

        if (unidade_saude_id) {
            const unidade = await unidadeSaude.findByPk(unidade_saude_id);

            if (!unidade) {
                return response.status(400).json({ erro: 'Unidade de saúde não encontrada' });
            }
        } else {
            return response.status(404).json({ erro: 'Unidade de saúde não foi enviada' });
        }

        const newPessoa = await pessoaModel.create({
            nome,
            cpf,
            data_nascimento,
            telefone,
            grupo_prioritario,
            endereco,
            email,
            unidade_saude_id
        });

        return response.status(200).json({
            status: "success",
            message: `Usuário ${nome}, inserida com sucesso!`,
            dados: newPessoa
        });


    } catch (error) {
        console.log(error);
        response.status(400).json({ error: "Erro ao criar pessoa" });
    }

}

exports.list = async (request, response) => {

    const { id } = request.params;

    if (id) {
        const pessoa = await pessoaModel.findById(id);

        if (!pessoa) {
            return response.status(200).json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de id ${id}`
            });
        }

        return response.status(200).json({
            status: "success",
            pessoa: pessoa
        });

    } else {
        const pessoas = await pessoaModel.findAll({
            include: { all: true }
        });

        return response.json(pessoas);
    }
};


exports.update = async (request, response) => {
    const { id } = request.params;

    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        grupo_prioritario,
        endereco,
        email,
        unidade_saude_id
    } = request.body;

    const pessoa = await pessoaModel.findById(id);

    if (!pessoa) {
        return response.status(200).json({
            status: "erro",
            message: `Não foi possível recuperar a pessoa de id ${id}`
        });
    }

    if (unidade_saude_id) {
        const unidade = await unidadeSaude.findByPk(unidade_saude_id_id);

        if (!unidade) {
            return response.status(400).json({ erro: 'Unidade de saúde não encontrada' })
        }
    }

    pessoa.update({
        nome,
        cpf,
        data_nascimento,
        telefone,
        grupo_prioritario,
        endereco,
        email,
        unidade_saude_id
    }, {
        where: { id: id }
    });

    return response.status(200).json({
        status: "success",
        message: `Pessoa ${pessoa.nome} atualizada com sucesso!`,
        dados: pessoa
    });
}

exports.delete = async (request, response) => {
    const { id } = request.params;

    try {
        await pessoaModel.destroy({
            where: {
                id: id
            }
        }).then(count => {
            if (!count) {
                return response.status(404).json({ error: 'Nenhuma pessoa encontrado' });
            }
            return response.status(200).json({
                status: "success",
                message: `Pessoa deletado com sucesso!`
            });
        });

    } catch (error) {
        return response.status(400).json(error);
    }
}