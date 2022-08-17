// const { Router } = require('express');
// const { User } = require('../db')
// const { users, login } = require('../controllers/Users');
// const router = Router();
// //* Creamos una ruta get para mostrar todos los usuarios
// router.get('/', async (req,res, next)=>{
//     try {
//         const { userName, password } = req.query
//         if(userName && password) return await login(userName, password)
//             .then(result =>{
//                 res.status(200).json(result);
//             })
//             .catch(err =>{
//                 console.log(`API/ROUTES (USERS/POST)\n[ Fallo el inicio de sesión ]\nError:\n\t[ ${err} ]`);
//                 res.status(404).json({err});
//             });
//         return await users()
//         .then(e => { //* Retornamos los datos de todos los usuarios
//             res.status(200).json(e);
//         })
//         .catch(err => { //! Retornamos un error en caso no se muestren los datos
//             console.log(`API/ROUTES (USERS/POST)\n[ Fallo la conexión del usuario ]\nError:\n\t[ ${err} ]`);
//             res.status(404).json({err});
//         });
//     } catch (error) {
//         console.log(`API/ROUTES (USERS/POST)\n[ Fallo la conexión con usuarios ]\nError:\n\t[ ${error} ]`);
//         res.status(404).json({error});
//     } finally{
//         next();
//     }
// });

// //* Creamos una ruta post con una funcion asincrona que permita crear usuarios
// router.post('/', async (req, res, next)=> {
//     try {
//         let {userName, password, firstName, lastName, email} = req.body; //* Recibimos los datos para agregar un usuario
//         if(!userName || !password) res.status(400) //* Condicionamos en caso el usuario y contraseña esten vacios
//         .json({Error: 'El usuario o la contraseña estan vacios, porfavor ingrese denuevo.'});
//         let stateFullname = await users(`${firstName} ${lastName}`, null).then(e=>e); //* Obtenemos un true en caso ya exista el nombre y un false si no existe
//         let stateUser = await users(null, userName).then(e=>e); //* Obtenemos un true en caso ya exista el nombre y un false si no existe
//         if(stateFullname) return res.status(400) //* Condicionamos en caso si existe el nombre y apellido del usuario retornamos un mensaje de error
//         .json({Error: 'Ya existe este nombre de usuario, porfavor ingrese su nombre y apellido'});
//         if(stateUser) return res.status(400) //* Condicionamos en caso si existe el usuario retornamos un mensaje de error
//         .json({Error: 'Ya existe este usuario, porfavor ingrese denuevo'});
//         return await User.create({userName, password, firstName, lastName, email}) //* Creamos un nuevo usuario
//         .then( result => { //* En caso no haya conflictos se crea el usuario
//             res.status(200).json({Request: 'Usuario creado'});
//         })
//         .catch(err => { //! En caso que haya algun conflicto retorna un error
//             console.log(`API/ROUTES (USERS/POST)\n[ Fallo la creación del usuario ]\nError:\n\t[ ${err} ]`);
//             res.status(404).json({Error: 'Usuario no creado'});
//         })
//         .finally(()=> next()); //* Ejecutamos otros middlewares
//     } catch (error) {
//         console.log(`API/ROUTES (USERS/POST)\n[ Fallo la conexión con los datos del usuario ]\nError:\n\t[ ${error} ]`);
//         res.status(404).json({error});
//     }
// });
// module.exports = router;