const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('touristActivity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true //Cuando la pk es entero le tengo que decir que se incremente
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER
    },
    duration: {
      type: DataTypes.FLOAT 
    },
    season: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};