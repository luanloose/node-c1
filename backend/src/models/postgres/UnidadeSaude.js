const { Model, DataTypes } = require('sequelize');

class UnidadeSaude extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      endereco: DataTypes.STRING,
      telefone: DataTypes.STRING,
      email: DataTypes.STRING,
      latlong: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Pessoa, { foreignKey: 'unidade_saude_id', as: 'pessoas' });
    this.hasOne(models.Agendamento, { foreignKey: 'unidade_saude_id', as: 'agendamentos' });
  }
}

module.exports = UnidadeSaude;