const { DataTypes } = require('sequelize');
//? Exportamos una funcion que define el modelo
//? Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //TODO defino el modelo
    sequelize.define('step', { //* tabla tipo de dieta
        id:{ //* id
            type: DataTypes.UUID, //* generar codigo id alfanumerico
            defaultValue: DataTypes.UUIDV4, //* valor por defecto generado alfanumerico
            primaryKey:true, //* llave primaria
            allowNull:false //* no permitir nulo
        },
        numStep: { //* numero de pasos
            type: DataTypes.INTEGER , //* tipo numerico
            allowNull: false, //* no permitir nulo
            defaultValue: 0
        },
        step: { //* pasos
            type: DataTypes.STRING , //* tipo texto
            allowNull: true //* permitir nulo
        }
    });
};