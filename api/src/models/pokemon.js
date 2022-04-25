const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    atack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });
};
