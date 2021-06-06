const unidadeSaude = require('../../models/postgres/UnidadeSaude');
const pessoa = require('../../models/postgres/Pessoa');

exports.add = async (request, response) => {
  try {
    const {
      nome,
      descricao,
      endereco,
      telefone,
      email,
      latlong
    } = request.body;

    const unidades = await unidadeSaude.findAll({
      include: { all: true }
    });

    unidades.map(item => {
      if (email === item.email) {
        return response.status(200).json({
          status: "erro",
          message: `A unidade de saúde ${nome} já está cadastrado no sistema com e-mail: ${email}`
        });
      }
    });

    const newUnidade = await unidadeSaude.create({
      nome,
      descricao,
      endereco,
      telefone,
      email,
      latlong
    });
        
    return response.status(200).json({
      status: "success",
      message: `Unidade ${nome} inserida com sucesso!`,
      dados: newUnidade
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao criar nova unidade de saúde" });
  }
}

exports.list = async (request, response) => {
  try {
    const id = request.params.id;
    if (id) {

      const unidadeDeSaude = await unidadeSaude.findById({
        param: id,
        options: {
          include: { association: 'pessoas' }
        }
      });

      if (!unidadeDeSaude) {
        return response.status(200).json({
          status: "erro",
          message: `Não foi possível recuperar a unidade de saúde de id ${id}`
        });
      }

      return response.status(200).json({
        status: "success",
        unidade: unidadeDeSaude
      });
    } else {
      const unidades = await unidadeSaude.findAll({
        include: { association: 'pessoas' }
      });

      return response.status(200).json({
        status: "success",
        unidade: unidades
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Erro ao listar as unidades" });
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;

  const {
    nome,
    descricao,
    endereco,
    telefone,
    email,
    latlong
  } = request.body;

  const unidade = await unidadeSaude.findById(id);

  if (unidade) {
    unidade.update({ nome, descricao, endereco, telefone, email, latlong }, {
      where: { id: id }
    });

    return response.status(200).json({
      status: "success",
      message: `Unidade de saúde ${unidade.nome} atualizado com sucesso!`,
      unidade: unidade
    });

  } else {
    return response.status(200).json({
      status: "erro",
      message: `Não foi possível recuperar a unidade de saúde de id ${id}`
    });
  }
}

exports.delete = async (request, response) => {
  try {
    const id = request.params.id;

    await unidadeSaude.destroy({
      where: {
        id: id
      }
    }).then(count => {
      if (!count) {
        return response.status(404).json({ error: 'Nenhuma unidade de saúde encontrado' });
      }
      response.status(204).json();
    });

  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Erro ao deletar a unidade de saúde!" });
  }
}