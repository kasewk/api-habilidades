'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class habilidades_devs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      habilidades_devs.belongsTo(models.habilidades, {foreignKey: "id_habilidade"});
      // habilidades_devs.belongsToMany(models.habilidades, {through: 'id_habilidade'});
      habilidades_devs.belongsTo(models.usuarios, { foreignKey: "id_dev" });
      // habilidades_devs.belongsToMany(models.usuarios, { through: "id_dev" });

    }
  };
  habilidades_devs.init({
    nivel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'habilidades_devs'
  });
  return habilidades_devs;
};