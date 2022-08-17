const { Router } = require('express');
const { TypeDiet } = require('../db')
const { diets } = require('../controllers/Diets');
const router = Router();
//* Creamos una ruta get para cargar todas las dietas que se encuentran en la api
router.get('/', async (req, res, next) => {
    try {
        await diets() //* Cargamos el array de dietas
        .then(result =>{
            result.forEach(i=>{ //* Recorremos dieta por dieta
                TypeDiet.findOrCreate({ //* Buscamos si existe la dieta en caso no haya la creamos
                    where: {name: i}
                });
            });
        })
        .catch(err => {
            console.log(`API/ROUTES (DIETS/GET)\n[ Fallo al guardar las dietas ]\nError:\n\t[ ${err} ]`);
            return res.status(404).json({err});
        });
        return await TypeDiet.findAll() //* Cargamos las dietas guardadas en la bd
        .then((result) => {
            res.status(200).json(result); //* Retornamos las dietas en un json
        })
        .catch((err) => {
            console.log(`API/ROUTES (DIETS/GET)\n[ Fallo al mostrar las dietas ]\nError:\n\t[ ${err} ]`);
            res.status(404).json({err}); //! Retornamos un error en caso que falle la operación
        })
        .finally(()=> next());
    } catch (error) {
        console.log(`API/ROUTES (DIETS/GET)\n[ Fallo la conexión con las dietas ]\nError:\n\t[ ${error} ]`);
        return res.status(404).json({error});
    }
});

module.exports= router;