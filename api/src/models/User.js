const { DataTypes } = require('sequelize');
//? Exportamos una funcion que define el modelo
//? Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  //TODO defino el modelo
    sequelize.define('user', { //* tabla tipo de dieta
        id:{ //* id
            type: DataTypes.UUID, //* generar codigo id alfanumerico
            defaultValue: DataTypes.UUIDV4, //* valor por defecto generado alfanumerico
            primaryKey:true, //* llave primaria
            allowNull:false //* no permitir nulo
        },
        userName: { //* nombre
            type: DataTypes.TEXT , //* tipo texto
            allowNull: false, //* no permitir nulo
            set(value){ this.setDataValue('userName', value.toLowerCase()); }
        },
        password: { //* nombre
            type: DataTypes.TEXT , //* tipo texto
            allowNull: false, //* no permitir nulo
        },
        firstName: { //* nombre
            type: DataTypes.STRING , //* tipo texto
            allowNull: true, //* permitir nulo
        },
        lastName: { //* apellido
            type: DataTypes.STRING , //* tipo texto
            allowNull: true, //* permitir nulo
        },
        fullName:{
            type: DataTypes.VIRTUAL,
            get() { return `${this.firstName} ${this.lastName}`; },
            set() { throw new Error('Do not try to set the `fullName` value!'); }
        },
        email: { //* nombre
            type: DataTypes.TEXT , //* tipo texto
            allowNull: true, //* permitir nulo
        }
    });
};