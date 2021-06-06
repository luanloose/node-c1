const agendamentoModel = require('../../models/mongo/agendamento');
const unidadeSaude = require('../../models/mongo/unidadeSaude');
const pessoaModel = require('../../models/mongo/pessoa');

exports.add = async (request, response) => {
  try {
    const {
      data_hora,
      necessidades_especiais,
      observacoes,
      pessoa,
      unidade_saude
    } = request.body;

    if (pessoa.length != 12 && pessoa.length != 24 || pessoa === null) {
      response.status(200).json({
        status: "erro",
        message: `Id de pessoa deve conter 12 ou 24 caracteres!`
      });
      return;
    }

    if (unidade_saude.length != 12 && unidade_saude.length != 24 || unidade_saude === null) {
      response.status(200).json({
        status: "erro",
        message: `Id da unidade de saude deve conter 12 ou 24 caracteres!`
      });
      return;
    }

    const pessoas = await pessoaModel.findById(pessoa);
    const unidadeDeSaude = await unidadeSaude.findById(unidade_saude);

    if (!pessoas || !unidadeDeSaude) {
      response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar a pessoa/unidade saude`
      });
      return;
    }

    agendamentoModel.find((err, agendamentos) => {
      if (err) {
        response.status(200).json({
          status: "erro",
          message: "Não foi possível recuperar os agendamentos e portanto inserir um novo agendamento!"
        });
        return;
      }

      agendamentos.map(item => {
        if (pessoa == item.pessoa) {
          response.status(200).json({
            status: "erro",
            message: `Já existe um agendamento para essa pessoa`
          });
          return;
        }
      });

      let data = new Date(data_hora);

      let agendamento = new agendamentoModel({
        data_hora: data,
        necessidades_especiais,
        observacoes,
        pessoa,
        unidade_saude,
      });

      agendamento.save((erro) => {
        if (erro) {
          response.status(200).json({
            status: "erro",
            message: erro
          });
          return;
        } else {
          response.status(200).json({
            status: "success",
            message: `Agendamento inserido com sucesso!`
          });
          return;
        }
      });
    });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Erro ao realizar um agendamento" });
  }
}

exports.list = async (request, response) => {
  try {
    const { id } = request.params;
    if (id) {

      if (id.length != 12 && id.length != 24 || id === null) {
        response.status(200).json({
          status: "erro",
          message: `${id} deve conter 12 ou 16 caracteres!`
        });
        return;
      }

      const agendamento = await agendamentoModel.findById(id);

      if (!agendamento) {
        response.status(200).json({
          status: "erro",
          message: `Não foi possível recuperar o agendamento de id ${id}`
        });
        return;
      }

      const unidadeDeSaude = await unidadeSaude.findById(agendamento.unidade_saude);

      const pessoaAgendada = await pessoa.findById(agendamento.pessoa);

      agendamento.pessoa = pessoaAgendada;
      agendamento.unidade_saude = unidadeDeSaude;

      response.status(200).json({
        status: "success",
        agendamento: agendamento
      });
      return;
    } else {
      agendamentoModel.find((erro, agendamentos) => {
        if (erro) {
          response.status(200).json({
            status: "erro",
            message: erro
          });
          return;
        } else {
          response.status(200).json({
            status: "success",
            agendamentos: agendamentos
          });
          return;
        }
      });
    }
  } catch (error) {
    response.status(400).json({ error: "Erro ao listar os agendamentos" });
  }
};


exports.update = async (request, response) => {
  try {
    const { id } = request.params;

    if (id.length != 12 && id.length != 24 || id === null) {
      response.status(200).json({
        status: "erro",
        message: `${id} deve conter 12 ou 16 caracteres!`
      });
      return;
    }

    agendamentoModel.findById(id, (erro, agendamento) => {
      if (erro || !agendamento) {
        response.status(200).json({
          status: "erro",
          message: `Não foi possível recuperar o agendamento de id ${id} para atualização`
        });
        return;
      } else {

        const {
          data_hora,
          necessidades_especiais,
          observacoes,
          pessoa,
          unidade_saude
        } = request.body;

        agendamento.data_hora = data_hora;
        agendamento.necessidades_especiais = necessidades_especiais;
        agendamento.observacoes = observacoes;
        agendamento.pessoa = pessoa;
        agendamento.unidade_saude = unidade_saude;

        agendamento.save((erro => {
          if (erro) {
            response.status(200).json({
              status: "erro",
              message: erro
            });
            return;
          } else {
            response.status(200).json({
              status: "success",
              message: `Agendamento atualizada com sucesso!`,
              agendamento: agendamento
            });
            return;
          }
        }));
      }
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao atualizar o agendamento" });
  }
}

exports.delete = async (request, response) => {
  try {
    const { id } = request.params;

    if (id.length != 12 && id.length != 24 || id === null) {
      response.status(200).json({
        status: "erro",
        message: `${id} deve conter 12 ou 16 caracteres!`
      });
      return;
    }

    const agendamento = await agendamentoModel.findById(id);

    if (!agendamento) {
      response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar o agendamento de id ${id}`
      });
      return;
    }

    await unidadeSaude.deleteOne({ _id: agendamento.unidade_saude });

    await pessoa.deleteOne({ _id: agendamento.pessoa });

    agendamentoModel.deleteOne({
      _id: id
    }, (erro) => {
      if (erro) {
        response.status(200).json({
          status: "erro",
          message: erro
        });
        return;
      } else {
        response.status(200).json({
          status: "success",
          message: `Agendamento deletado com sucesso!`
        });
        return;
      }
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao deletar o agendamento" });
  }
}