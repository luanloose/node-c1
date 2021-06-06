const agendamentoModel = require('../../models/postgres/Agendamento');
const unidadeSaude = require('../../models/postgres/UnidadeSaude');
const pessoaModel = require('../../models/postgres/Pessoa');

exports.add = async (request, response) => {
  try {
    const {
      data_hora,
      necessidades_especiais,
      observacoes,
      pessoa_id,
      unidade_saude_id
    } = request.body;

    const pessoas = await pessoaModel.findByPk(pessoa_id);
    const unidadeDeSaude = await unidadeSaude.findByPk(unidade_saude_id);

    if (!pessoas || !unidadeDeSaude) {
      response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar a pessoa/unidade saude`
      });
      return;
    }

    const agendamentos = await agendamentoModel.findAll({
      include: { all: true }
    });

    if (!agendamentos) {
      response.status(200).json({
        status: "erro",
        message: "Não foi possível recuperar os agendamentos e portanto inserir um novo agendamento!"
      });
      return;
    } else {
      agendamentos.map(item => {
        if (pessoa == item.pessoa_id) {
          response.status(200).json({
            status: "erro",
            message: `Já existe um agendamento para essa pessoa`
          });
          return;
        }
      });

      let data = new Date(data_hora);

      const agendamento = await agendamentoModel.create({
        data_hora: data,
        necessidades_especiais,
        observacoes,
        pessoa_id,
        unidade_saude_id,
      });

      return response.json(agendamento);
    }

  } catch (error) {
    response.status(400).json({ error: error });
    response.status(400).json({ error: "Erro ao realizar um agendamento" });
  }
}

exports.list = async (request, response) => {
  try {
    const { id } = request.params;
    if (id) {
      const agendamento = await agendamentoModel.findByPk(id);

      if (!agendamento) {
        return response.status(200).json({
          status: "erro",
          message: `Não foi possível recuperar o agendamento de id ${id}`
        });
      }
      
      return response.status(200).json({
        status: "success",
        agendamento: agendamento
      });

    } else {
      const agendamentos = await agendamentoModel.findAll({
        include: { all: true }
      });

      return response.status(200).json({
        status: "success",
        agendamentos: agendamentos
      });
    }
  } catch (error) {
    response.status(400).json({ error: "Erro ao listar os agendamentos" });
  }
};


exports.update = async (request, response) => {
  try {
    const { id } = request.params;

    const agendamento = agendamentoModel.findByPk(id);
    
    if (!agendamento) {
      return response.status(200).json({
        status: "erro",
        message: `Não foi possível recuperar o agendamento de id ${id} para atualização`
      });
    } else {

      const {
        data_hora,
        necessidades_especiais,
        observacoes,
        pessoa,
        unidade_saude_id
      } = request.body;

      agendamento.update({
        data_hora,
        necessidades_especiais,
        observacoes,
        pessoa,
        unidade_saude_id
      }, {
        where: { id: id }
      });

      return response.json(agendamento);
    }

  } catch (error) {
    response.status(400).json({ error: "Erro ao atualizar o agendamento" });
  }
}

exports.delete = async (request, response) => {
  try {
    const { id } = request.params;

    await agendamentoModel.destroy({
      where: {
        id: id
      }
    }).then(count => {
      if (!count) {
        return response.status(404).json({ error: 'Nenhum agendamento encontrado' });
      }
      response.status(204).json();
    });

  } catch (error) {
    response.status(400).json({ error: "Erro ao deletar o agendamento" });
  }
}