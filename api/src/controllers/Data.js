const axios= require('axios');
const{ apiKey } = require('../db')
const { Sequelize } = require('sequelize');

//TODO Capturamos todos los datos de la api
module.exports = {
    getApiRecipes: async () => {
        try {
            let stateApi = true, api; //*Inicializamos el estado de la url y la api
            api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`) //* consultamos los datos de la api
            .then(result => { //* En caso haya datos en la api el estado queda en true y retornamos los datos
                stateApi = true
                return result;
            })
            .catch(err => { //! En caso falle la consulta el estado queda en false y mostramos el error
                stateApi = false
                console.log(`API/CONTROLLERS (DATA)\t'getApiRecipes'\n[ Fallo de conexión de la api ]\nError:\n\t[ ${err} ]`);
            });
            if(!stateApi) api = await axios.get(`http://localhost:3002/`) //* En caso falle la consulta de la api consultamos los datos en un servidor local
            .then(result => { //* En caso haya datos el estado del url quedara en false y retornamos los datos
                stateApi = false
                return result;
            })
            .catch(err => { //! En caso falle el servidor local el estado de la url quedara en true y mostramos el error
                stateApi = true
                console.log(`API/CONTROLLERS (DATA)\t'getApiRecipes'\n[ Fallo de conexión del servidor local ]\nError:\n\t[ ${err} ]`);
            });
            return await api.data.results.map(e =>{ //* Mapeamos los datos de la api o el servidor local en un array
                const steps = e.analyzedInstructions.map(e =>{ return e.steps.map( e => { return { numStep:e.number, step:e.step } } ); } ); //* Paso a paso de la receta
                return {
                    id: `${e.id}`, //* ID
                    name: e.title, //* Nombre de la receta
                    summary: e.summary, //* Resumen del
                    healthScore: e.healthScore, //* Nivel de comida saludable
                    steps: steps.length ? steps[0] : [],
                    image: e.image, //* imagen
                    diets: e.diets, //* tipos de dieta
                }
            }) || {Error: 'No se encontraron datos en la api ni en el servidor local'}; //! En caso no haya datos devolvera un arreglo con un error
        } catch (error) { //! En caso falle la conexxion con los servidores
            console.log(`API/CONTROLLERS (DATA)\t'getApiRecipes'\n[ Fallo de conexión de los servidores ]\nError:\n\t[ ${err} ]`);
            return {Error: 'Fallo la conexión de los servidores'};
        }
    }
}