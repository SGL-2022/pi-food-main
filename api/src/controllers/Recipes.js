const{ Recipe, TypeDiet, Step } = require('../db');
const { getApiRecipes } = require('./Data');

const include = [{ //* Incluimos las dietas asociadas
    model:TypeDiet,
    attributes: ['name'], //* Mostramos el id y la dieta
    through: { //* Ignoramos la tabla asociada
        attributes: []
    }
},{ //* Incluimos los pasos asociados
    model:Step,
    attributes: ['id','numStep','step'], //* Mostramos el id, el numero de pasos y los pasos
    required:false
}];

module.exports = {
    getRecipes: async (id = '', name = '') => { //* Funcion para mostrar todas las recetas, dietas y pasos
        try {
            var filterData = [];
            const getServerRecipes = await getApiRecipes();
            const getBdRecipes = await Recipe.findAll({ //* Consultamos un select de recetas
                include
            })
            .then((result) => {
                return result.map(e => { //* Mapeamos el resultado del select
                    const diets = e.typeDiets.map(e=>e.name);
                    return {
                        id: e.id,
                        name: e.name,
                        summary: e.summary,
                        healthScore: e.healthScore,
                        image: e.image,
                        createdAt: e.createdAt,
                        updatedAt: e.updateAt,
                        userId: e.userId,
                        diets: diets,
                        steps: e.steps
                    };
                }) || [];
            })
            .catch(err => { //! En caso falle la consulta mostramos el error
                console.log(`API/CONTROLLERS (RECIPES)\t'getRecipes'\n[ Fallo de proceso de consulta ]\nError:\n\t[ ${err} ]`);
                return [];
            });
            const allData = getBdRecipes.length ? [...getBdRecipes, ...getServerRecipes] : getServerRecipes;
            if(id || name){
                for(var i = 0; i < allData.length; i++){
                    if(allData[i].id === id) {
                        filterData.push(allData[i]);
                        break;
                    }
                    else if(allData[i].name?.toLowerCase().includes(name?.toLowerCase())) {
                        filterData.push(allData[i])
                    }
                }
                if(!filterData.length) filterData = [{Request: 'No existe la receta'}];
            }
            return filterData.length ? filterData : allData;
        } catch (error) {
            console.log(`API/CONTROLLERS (RECIPES)\t'getRecipes'\n[ Fallo de conexión ]\nError:\n\t[ ${error} ]`);
            return [];
        }
    },/**userId = null */
    postBdRecipes: async (name = '', summary = '', healthScore = 0, image = '', diets = [], steps = []) => { //* Funcion para crear recetas
        try {
            let createRecipe =  await Recipe.create({name, summary, healthScore, image}) //* Creamos la receta retornando su estado /**userId */
            let stateDiets = await TypeDiet.findAll({where:{name:diets}}) //* Buscamos las dietas que asociamos con la receta recien creada
            .then(result =>{
                createRecipe.addTypeDiet(result); //* Asociamos la receta con la dieta
                return [true, 'Asociacion creada']; //* Retornamos true si se asocio correctamente
            })
            .catch(err =>{ //! Si falla
                console.log(`API/CONTROLLERS (RECIPES)\t'postBdRecipes'\n[ Fallo asociacion de las recetas con dietas ]\nError:\n\t[ ${err} ]`);
                return [false, 'Asociación no creada']; //! Retornamos false si fracaso la asociacion
            });
            if(stateDiets[0]) return await Recipe.findAll({where:{name:name}}) //* En caso se haya creado la receta sin problemas buscamos la receta agregada
                .then((result) => {
                    let jsonId = JSON.stringify(result); //* Convertimos los datos de busqueda en formato json
                    let objectId = JSON.parse(jsonId); //* Convertimos los datos json en objetos
                    steps.forEach(e =>{ //* Recorremos el array de objetos de los pasos de las recetas
                        Step.create({numStep:e.numStep, step: e.step, recipeId:objectId[0].id}); //* Agregamos los pasos en la bd con su respectivo id de la receta
                    });
                    return [true, 'Receta con los pasos creado']; //* Retornamos un array con true si se agrego los pasos y un mensaje a mostrar
                }).catch((err) => { //! Si falla
                    console.log(`API/CONTROLLERS (RECIPES)\t'postBdRecipes'\n[ Fallo la creación de pasos de la receta ]\nError:\n\t[ ${err} ]`);
                    return [false, 'Receta con los pasos no creado']; //! Retornamos un array con false si no se agrego los pasos y un mensaje a mostrar
                });
            return stateDiets;
        } catch (error) {
            console.log(`API/CONTROLLERS (RECIPES)\t'postBdRecipes'\n[ Fallo la creación de la receta ]\nError:\n\t[ ${error} ]`);
            return [false, 'Receta no creada']; //! Retornamos un array con false si no se agrego los pasos y un mensaje a mostrar
        }
    },
    validateRecipes: async(name = null) => {
        try {
            return await Recipe.findAll({where:{name:name}})
            .then(result => {
                if(result.length) return [false, 'Ya hay una receta con ese nombre'];
                return [true, 'No existe esta receta'];
            })
            .catch(err =>{
                console.log(`API/CONTROLLERS (RECIPES)\t'validateRecipes'\n[ Fallo la consulta de las recetas ]\nError:\n\t[ ${err} ]`);
                return [false, 'Ya hay una receta con ese nombre'];
            });
        } catch (error) {
            console.log(`API/CONTROLLERS (RECIPES)\t'validateRecipes'\n[ Fallo la conexión con las recetas ]\nError:\n\t[ ${error} ]`);
            return [false, 'No muestra recetas'];
        }
    }
};