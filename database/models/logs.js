'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logs.belongsTo(models.usuarios, {foreignKey: "id_user"});
    }
  };
  logs.init({
    id_user: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    tabela: DataTypes.STRING,
    id_changed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'logs',
  });
  return logs;
};