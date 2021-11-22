'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      usuarios.hasMany(models.habilidades_devs, { foreignKey: "id_dev" });
      usuarios.hasMany(models.logs, { foreignKey: "id_user" });
      // usuarios.belongsToMany(models.habilidades_devs, { through: models.habilidades_devs });
    }
  };
  usuarios.init({
    nome: DataTypes.STRING,
    cargo: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    senha: DataTypes.STRING,
    role: DataTypes.ENUM('dev', 'gestor'),
    codigo_temp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};