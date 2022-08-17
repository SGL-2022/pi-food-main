// const{ User } = require('../db');
// //* Exportamos el filtro de usuarios
// module.exports = {
//     users: async (fullName = null, userName = null) => { //* Creamos una funcion asincrona con parametros
//         try {
//             let stateUser = false; //* Establecemos el estado del usuario si existe o no
//             return await User.findAll() //* Recorremos los usuarios en la bd
//             .then((result) => {
//                 let jsonUser = JSON.stringify(result) || null; //* En caso haya usuarios los convertimos en formato json sino devolvemos vacio
//                 let objectUser = JSON.parse(jsonUser) || {}; //* Convertimos los datos json a objetos en caso falle devolvemos un objeto vacio
//                 if(fullName){ //* En caso ingresemos para filtrar el nombre
//                     objectUser.forEach(e => { //* Recorremos los usuarios y cambiaremos el estado en caso exista el nombre de usuario
//                         e.fullName === fullName ? stateUser = true : stateUser = false;
//                     });
//                     return stateUser; //* Retornamos el estado del usuario
//                 }
//                 if(userName){ //* En caso ingresemos para filtrar el usuario
//                     objectUser.forEach(e => { //* Recorremos los usuarios y cambiaremos el estado en caso exista el usuario
//                         e.userName === userName ? stateUser = true : stateUser = false;
//                     });
//                     return stateUser; //* Retornamos el estado del usuario
//                 }
//                 return result.length ? result : {Error: 'No hay usuarios'}; //* En caso que solo mostremos los usuarios retornamos sino retornamos un error
//             }).catch((err) => { //! Si falla el proceso mostramos un error
//                 return console.log(`API/CONTROLLERS (USERS)\t'users'\n[ Fallo la operacion de agregar un usuario ]\nError:\n\t[ ${err} ]`);
//             });
//         } catch (error) {
//             return console.log(`API/CONTROLLERS (USERS)\t'users'\n[ Fallo la conexión a usuarios ]\nError:\n\t[ ${err} ]`);
//         }
//     },
//     validateUsers: async (id = null) => {
//         try {
//             let stateUser = false; //* Establecemos el estado del usuario si existe o no
//             return await User.findAll({where:{id:id}})
//             .then(result => {
//                 let jsonUser = JSON.stringify(result) || null; //* En caso haya usuarios los convertimos en formato json sino devolvemos vacio
//                 let objectUser = JSON.parse(jsonUser) || {}; //* Convertimos los datos json a objetos en caso falle devolvemos un objeto vacio
//                 objectUser.forEach(e => { //* Recorremos los usuarios y cambiaremos el estado en caso exista el nombre de usuario
//                     e.id === id ? stateUser = true : stateUser = false;
//                 });
//                 return stateUser; //* Retornamos el estado del usuario
//             })
//             .catch(err => {
//                 console.log(`API/CONTROLLERS (USERS)\t'validateUsers'\n[ Fallo la consulta a usuarios por id ]\nError:\n\t[ ${err} ]`);
//                 return false;
//             });
//         } catch (error) {
//             console.log(`API/CONTROLLERS (USERS)\t'validateUsers'\n[ Fallo la conexión con usuarios ]\nError:\n\t[ ${error} ]`);
//                 return false;
//         }
//     },
//     login: async (userName = null, password = null) => {
//         try {
//             return User.findAll({where:{userName,password}})
//             .then(result =>{
//                 let jsonUser = JSON.stringify(result) || null; //* En caso haya usuarios los convertimos en formato json sino devolvemos vacio
//                 let objectUser = JSON.parse(jsonUser) || {}; //* Convertimos los datos json a objetos en caso falle devolvemos un objeto vacio
//                 return objectUser.length ? objectUser: {Error: 'No se encontro el usuario'};
//             })
//             .catch(err =>{
//                 console.log(`API/CONTROLLERS (USERS)\t'login'\n[ Fallo el inicio de sesión ]\nError:\n\t[ ${err} ]`);
//                 return { Error: 'No se encuentra el usuario' };
//             });
//         } catch (error) {
//             console.log(`API/CONTROLLERS (USERS)\t'login'\n[ Fallo la conexión con usuarios ]\nError:\n\t[ ${err} ]`);
//             return { Error: 'Fallo el inicio de sesión' };
//         }
//     }
// };