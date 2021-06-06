const { Model, DataTypes } = require('sequelize');

class Agendamento extends Model {
  static init(sequelize) {
    super.init({
      data_hora: { type: DataTypes.DATE, unique: true },
      necessidades_especiais: DataTypes.BOOLEAN,
      observacoes: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.UnidadeSaude, { foreignKey: 'unidade_saude_id', as: 'unidadeSaude' });
    this.belongsTo(models.Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' });
  }
}

module.exports = Agendamento;