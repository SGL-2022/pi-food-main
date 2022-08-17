const { Router } = require('express');
const { getRecipes, postBdRecipes, validateRecipes } = require('../controllers/Recipes');
//const { validateUsers } = require('../controllers/Users');
const router = Router();
//* Creamos una ruta get para mostrar toda las recetas
router.get('/', async (req, res)=>{
    try {
        const { name } = req.query; //* Capturamos una consulta por el nombre de la receta
        return await getRecipes(null, name) //* Retornamos el resultado al llamar a las recetas / filtramos por nombre de receta si hay algo
        .then((result) => {
            return res.status(200).json(result); //* Retornamos los resultados
        }).catch((err) => { //! Mostramos el error
            console.log(`API/ROUTES (RECIPES/GET)\n[ Fallo al mostrar las recetas ]\nError:\n\t[ ${err} ]`);
            return res.status(400).json({Error: 'No hay recetas'});
        });
    } catch (error) { //! Mostramos el error
        console.log(`API/ROUTES (RECIPES/GET)\n[ Fallo la conexión con las recetas ]\nError:\n\t[ ${error} ]`);
        return res.status(400).json({Error: error});
    }
});

//* Creamos una ruta get/:id para filtrar los datos en caso sea el id de la receta
router.get('/:id', async (req, res)=>{
    try {
        const { id } = req.params //* Capturamos los parametros de la url
        return await getRecipes(id, null) //* Retornamos el resultado al llamar a las recetas / filtramos por id de receta
        .then((result) => {
            return res.status(200).json(result); //* Retornamos los resultados
        }).catch((err) => { //! Mostramos el error
            console.log(`API/ROUTES (RECIPES/GET/ID)\n[ Fallo al mostrar las recetas ]\nError:\n\t[ ${err} ]`);
            return res.status(400).json({Error: 'No existe la receta'});
        });
    } catch (error) { //! Mostramos el error
        console.log(`API/ROUTES (RECIPES/GET/ID)\n[ Fallo la conexión con las recetas ]\nError:\n\t[ ${error} ]`);
        return res.status(400).json({Error: error});
    }
});

//* Creamos una ruta post para crear las recetas en la bd
router.post('/', async (req, res) => {
    try {
        let { name, summary, healthScore, image, diets, steps} = req.body; //* Capturamos los parametros enviados /**userId */
        //let stateUser = await validateUsers(userId).then(e=>e); //* validamos si el usuario esta en la base de datos para la creación de la receta
        //if(!stateUser) return res.status(400).json({Error: 'El usuario de la receta no existe'}); //* En caso no este el usuario conectado retornamos un error
        if(!name || !summary) return res.status(400) //*Filtramos que el titulo y el resumen no esten vacios
        .json({Error: 'El titulo o el resumen no pueden estar vacios, por favor ingrese denuevo'});
        return await validateRecipes(name) //* Validamos si la receta ya existe para evitar duplicados
        .then(result => {
            if(result[0]) return postBdRecipes(name, summary, healthScore, image, diets, steps) //* Enviamos los datos para crear la receta /**userId */
                .then((result) => { //* Si se crea correctamente devuelve un mensaje caso contrario un mensaje del error
                    return result[0] ? res.status(200).json({Request: result[1]}) : res.status(200).json({Request: result[1]});
                }).catch((err) => { //! Mostramos el error
                    console.log(`API/ROUTES (RECIPES/POST)\n[ Fallo la creación de la receta ]\nError:\n\t[ ${err} ]`);
                    return res.status(404).json({Error: 'Fallo agregar recetas' + err});
                });
            return res.status(404).json({Error: result[1]}); //! mostramos el error interno
        })
        .catch((err) => { //! Mostramos el error
            console.log(`API/ROUTES (RECIPES/POST)\n[ Fallo la validación ]\nError:\n\t[ ${err} ]`);
            return res.status(404).json({Error: 'Fallo la validacion'});
        });
    } catch (error) { //! Mostramos el error
        console.log(`API/ROUTES (RECIPES/POST)\n[ Fallo la conexión con los datos de la receta ]\nError:\n\t[ ${error} ]`);
        res.status(400).json({Error: error});
    }
});

module.exports = router;