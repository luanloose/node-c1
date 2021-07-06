const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf: { type: DataTypes.STRING, unique: true },
      data_nascimento: DataTypes.STRING,
      telefone: DataTypes.STRING,
      grupo_prioritario: DataTypes.BOOLEAN,
      endereco: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.UnidadeSaude, { foreignKey: 'unidade_saude_id', as: 'unidadeSaude' });
    this.hasOne(models.Agendamento, { foreignKey: 'pessoa_id', as: 'agendamento' });
  }
}

module.exports = Pessoa;