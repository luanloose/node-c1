const unidadeSaude = require('../models/unidadeSaude');

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
      }

      unidades.map(item => {
        if (email === item.email) {
          response.status(200).json({
            status: "erro",
            message: `A unidade de saúde ${nome} já está cadastrado no sistema com e-mail: ${email}`
          });
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
        } else {
          response.send({
            status: "ok",
            message: `Unidade ${nome} inserida com sucesso!`
          });
        }
      })
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao criar nova unidade de saúde" });
  }
}

exports.list = async (request, response) => {
  try {
    const { id } = request.params;
    if (id) {
      unidadeSaude.findById(id, function (erro, unidadeS) {
        if (erro || !unidadeS) {
          response.status(200).json({
            status: "erro",
            message: `Não foi possivel recuperar a unidade de saude de id: ${id}`
          });
        } else {
          response.status(200).json({
            status: "ok",
            unidade: unidadeS
          });
        }
      }).populate('pessoa');
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
    response.status(400).json({ error: "Erro ao listar as unidades" });
  }
};

exports.update = (request, response) => {
  const { id } = request.params;

  unidadeSaude.findById(id, (erro, unidade) => {
    if (erro || !unidade) {
      response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar a unidade de saúde de id ${id} para update!`
      });
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
            status: "ok",
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
    const { id } = request.params;

    unidade.deleteOne({
      _id: id
    }, (err) => {
      if (err) {
        response.status(200).json({
          status: "erro",
          message: "Houve um erro ao deletar a unidade de saúde"
        });
      } else {
        response.status(200).json({
          status: "ok",
          message: `Unidade de saúde deletada com sucesso!`
        });
      }
    });

  } catch (error) {
    response.status(400).json({ error: "Erro ao deletar a unidade de saúde!" });
  }
}