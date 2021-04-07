const agendamentoModel = require('../models/agendamento');
const unidadeSaude = require('../models/unidadeSaude');
const pessoa = require('../models/pessoa');

exports.add = async (request, response) => {
  try {
    const {
      data_hora,
      necessidades_especiais,
      observacoes,
      pessoa,
      unidade_saude
    } = request.body;

    agendamentoModel.find((err, agendamentos) => {
      if (err) {
        response.status(200).json({
          status: "erro",
          message: "Não foi possível recuperar os agendamentos e portanto inserir um novo agendamento!"
        });
      }

      agendamentos.map(item => {
        if (pessoa === item.pessoa) {
          response.status(200).json({
            status: "erro",
            message: `Já existe um agendamento para essa pessoa`
          });
          return;
        }
      });

      var data = new Date(data_hora);

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
        } else {
          response.status(200).json({
            status: "success",
            message: `Agendamento inserido com sucesso!`
          });
        }
      });
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao realizar um agendamento" });
  }
}

exports.list = async (request, response) => {
  try {
    const { id } = request.params;
    if (id) {

      const agendamento = await agendamentoModel.findById(id);

      const unidadeDeSaude = await unidadeSaude.findById(agendamento.unidade_saude);

      const pessoaAgendada = await pessoa.findById(agendamento.pessoa);

      agendamento.pessoa = pessoaAgendada;
      agendamento.unidade_saude = unidadeDeSaude;

      response.status(200).json({
        status: "success",
        agendamento: agendamento
      });

    } else {
      agendamentoModel.find((erro, agendamentos) => {
        if (erro) {
          response.status(200).json({
            status: "erro",
            message: erro
          });
        } else {
          response.status(200).json({
            status: "success",
            agendamentos: agendamentos
          });
        }

      });
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "Erro ao listar os agendamentos" });
  }
};


exports.update = async (request, response) => {
  try {
    const { id } = request.params;

    agendamentoModel.findById(id, (erro, agendamento) => {
      if (erro || !agendamento) {
        response.status(200).json({
          status: "erro",
          message: `Não foi possível recuperar o agendamento de id ${id} para atualização`
        });
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
          } else {
            response.status(200).json({
              status: "success",
              message: `Agendamento atualizada com sucesso!`,
              agendamento: agendamento
            });
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

    agendamento.deleteOne({
      _id : id
    }, (erro) => {
      if (erro) {
        response.status(200).json({
          status: "erro",
          message: erro
        });
      } else {
        response.status(200).json({
          status: "success",
          message: `Agendamento deletado com sucesso!`
        });
      }
    });
  } catch (error) {
    response.status(400).json({ error: "Erro ao deletar o agendamento" });
  }
}