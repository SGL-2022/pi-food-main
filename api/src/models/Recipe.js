const { DataTypes } = require('sequelize');
//? Exportamos una funcion que define el modelo
//? Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //TODO defino el modelo
  sequelize.define('recipe', { //* tabla recetas
    id : { //* id
      type: DataTypes.UUID, //* generar codigo id alfanumerico
      defaultValue: DataTypes.UUIDV4, //* valor por defecto generado alfanumerico
      allowNull: false, //* no permitir nulo
      primaryKey : true //* llave primaria
    },
    name: { //* nombre
      type: DataTypes.STRING, //* tipo texto
      allowNull: false,
    },
    summary:{ //* resumen
      type : DataTypes.TEXT, //* tipo texto
      allowNull: false //* no permitir nulo
    },
    healthScore: { //* nivel de comida saludable
      type: DataTypes.INTEGER, //* tipo numerico
      defaultValue: 0 //* valor por defecto
    },
    image:{ //* imagen
      type: DataTypes.TEXT, //* tipo texto
      allowNull: true, //* permitir nulo
    }
  });
};
