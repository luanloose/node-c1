const unidadeSaude = require('../../models/mongo/unidadeSaude');
const pessoa = require('../../models/mongo/pessoa');

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

    unidadeSaude.find((err, unidades) => {
      if (err) {
        response.status(200).json({
          status: "erro",
          message: "Não foi possível recuperar as unidades de saúde!"
        });
        return;
      }

      unidades.map(item => {
        if (email === item.email) {
          response.status(200).json({
            status: "erro",
            message: `A unidade de saúde ${nome} já está cadastrado no sistema com e-mail: ${email}`
          });
          return;
        }
      });

      let newUnidade = new unidadeSaude({
        nome,
        descricao,
        endereco,
        telefone,
        email,
        latlong
      });

      newUnidade.save((erro) => {
        if (erro) {
          response.send({
            status: "erro",
            message: "Não foi possível inserir a unidade de saúde."
          });
          return;
        } else {
          response.send({
            status: "success",
            message: `Unidade ${nome} inserida com sucesso!`
          });
          return;
        }
      })
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao criar nova unidade de saúde" });
  }
}

exports.list = async (request, response) => {
  try {
    const id = request.params.id;
    if (id) {

      if (id.length != 12 && id.length != 24) {
        response.status(200).json({
          status: "erro",
          message: `${id} deve conter 12 ou 24 caracteres!`
        });
        return;
      }

      const unidadeDeSaude = await unidadeSaude.findById(id);

      if (!unidadeDeSaude) {
        response.status(200).json({
          status: "erro",
          message: `Não foi possível recuperar a unidade de saúde de id ${id}`
        });
        return;
      }

      const pessoas = await pessoa.find({ unidade_saude: id });

      unidadeDeSaude.pessoa = pessoas;

      response.status(200).json({
        status: "success",
        unidade: unidadeDeSaude
      });
    } else {
      unidadeSaude.find(function (erro, unidadeS) {
        if (erro) {
          response.status(200).json({
            status: "erro",
            message: "Não foi possível recuperar as unidades de saude!"
          });
        } else {
          response.status(200).json({
            unidades: unidadeS
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Erro ao listar as unidades" });
  }
};

exports.update = async (request, response) => {
  const { id } = request.params;

  if (id.length != 12 && id.length != 24) {
    response.status(200).json({
      status: "erro",
      message: `${id} deve conter 12 ou 24 caracteres!`
    });
    return;
  }

  const unidadeDeSaude = await unidadeSaude.findById(id);

  if (!unidadeDeSaude) {
    response.status(200).json({
      status: "erro",
      message: `Não foi possível recuperar a unidade de saúde de id ${id}`
    });
    return;
  }

  unidadeSaude.findById(id, (erro, unidade) => {
    if (erro || !unidade) {
      response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar a unidade de saúde de id ${id} para update!`
      });
      return;
    } else {

      const {
        nome,
        descricao,
        endereco,
        telefone,
        email,
        latlong
      } = request.body;

      unidade.nome = nome;
      unidade.descricao = descricao;
      unidade.endereco = endereco;
      unidade.telefone = telefone;
      unidade.email = email;
      unidade.latlong = latlong;

      unidade.save((erro => {
        if (erro) {
          response.status(200).json({
            status: "erro",
            message: "Houve um erro ao atualizar da unidade de saúde!"
          });
        } else {
          response.status(200).json({
            status: "success",
            message: `Unidade de saúde ${unidade.nome} atualizado com sucesso!`,
            unidade: unidade
          })
        }
      }))
    }
  });
}

exports.delete = async (request, response) => {
  try {
    const id = request.params.id;

    if (id.length != 12 && id.length != 24 || id === null) {
      response.status(200).json({
        status: "erro",
        message: `${id} deve conter 12 ou 24 caracteres!`
      });
      return;
    }

    const unidadeDeSaude = await unidadeSaude.findById(id);

    if (!unidadeDeSaude) {
      response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar a unidade de saúde de id ${id}`
      });
      return;
    }

    const pessoas = await pessoa.find({ unidade_saude: id });

    if (Object.keys(pessoas).length > 0) {
      response.status(200).json({
        status: "erro",
        message: "Não é possível excluir essa unidade, existem pessoas associadas a ela!"
      });
      return;
    }

    unidadeSaude.deleteOne({
      _id: id
    }, (err) => {
      if (err) {
        response.status(200).json({
          status: "erro",
          message: "Houve um erro ao deletar a unidade de saúde"
        });
      } else {
        response.status(200).json({
          status: "success",
          message: `Unidade de saúde deletada com sucesso!`
        });
      }
    });

  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Erro ao deletar a unidade de saúde!" });
  }
}