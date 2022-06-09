const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperament:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {timestamps: false});
};
