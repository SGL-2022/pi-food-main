//TODO Creamos y exportamos un arreglo con las dietas
const { getApiRecipes } = require('./Data'); //* Importamos los datos traidos de la api
//* Filtramos y exportamos los dietas de los datos importados
module.exports = {
    diets: async() => {
        try {
            return await getApiRecipes()
            .then(element => { //* Recorremos los datos de la api
                let list = []; //* Declaramos un array donde se almacenaran las dietas
                element.forEach(item=>{ //* Recorremos los datos de cada dato de las recetas
                    item.diets.forEach(diet =>{ //* Recorremos las dietas de cada receta
                        if(!list.includes(diet))list.push(diet) //* Filtramos en caso no exista la receta en la lista lo agregamos
                    });
                });
                return list.sort(); //* Retornamos la lista ordenada de las dietas
            })
            .catch(err => { //! En caso no cargue las dietas
                console.log(`API/CONTROLLERS (DIETS)\t'diets'\n[ Fallo la consulta de las dietas ]\nError:\n\t[ ${err} ]`);
                return [];
            });
        } catch (error) { //! En caso falle la consulta de la api
            console.log(`API/CONTROLLERS (DIETS)\t'diets'\n[ Fallo la conexión a la api ]\nError:\n${error}`);
            return [];
        }
    }
}