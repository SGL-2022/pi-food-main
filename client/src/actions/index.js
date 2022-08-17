//* Importamos la libreria axios para las consultas
import axios from 'axios';

//* Declaramos y exportamos las acciones
export const GET_RECIPES = 'GET_RECIPES'; //* Acción capturar las recetas
export const GET_DIETS = 'GET_DIETS'; //* Acción capturar las dietas
// export const GET_USERS = 'GET_USERS'; //* Acción capturar los usuarios
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'; //* Acción filtrar las recetas por dietas
export const ORDER_BY_NAME = 'ORDER_BY_NAME'; //* Acción ordenar las recetas por nombre
export const ORDER_BY_HEALTHSCORE = 'ORDER_BY_HEALTHSCORE'; //* Acción ordenar las recetas por healthscore
export const SEARCH_BY_NAME = 'SEARCH_BY_NAME'; //* Acción buscar recetas por nombre
export const SEARCH_BY_ID = 'GET_BY_ID'; //* Acción buscar recetas por el id
export const POST_RECIPES = 'POST_RECIPES'; //* Acción enviar recetas nuevas
// export const POST_USERS = 'POST_USERS'; //* Acción enviar usuarios nuevos
// export const LOGIN = 'LOGIN'; //* Acción inicia sesión
export const MODE_STYLE = 'MODE_STYLE';
export const STATE_LINK = 'STATE_LINK';

//TODO Creamos y exportamos las funciones con sus respectivas acciones

export const getRecipes = (id = null, name = null) => { //* Función para capturar todas las recetas o filtrarlas por nombre o id
    return async dispatch =>{
        try {
            let url = `http://localhost:3001/recipes`; //* Url de consulta
            if(id) url += `/${id}`; //* En caso haya id, concatenamos la url para buscar por id
            else if(name) url += `?name=${name}`; //* En caso haya nombre, concatenamos la url para buscar por nombre
            return await axios.get(url) //* Consultamos por axios
            .then(result => {
                if(id) return dispatch({type: SEARCH_BY_ID, payload: result.data}); //* Retornamos el filtrado de las recetas por id
                else if(name) return dispatch({type: SEARCH_BY_NAME, payload: result.data}); //* Retornamos el filtrado de las recetas por el nombre
                return dispatch({type: GET_RECIPES, payload: result.data}); //* Si no filtramos retornamos todas las recetas
            })
            .catch(err => { //! Mostramos el error y lo capturamos
                return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getRecipes'\n[ Fallo la consulta con el servidor ]\nError:\n\t[ ${err} ]`);
            });
        } catch (error) { //! Mostramos el error y lo capturamos
            return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getRecipes'\n[ Fallo la conexión con el servidor ]\nError:\n\t[ ${error} ]`);
        }
    }
}

export const getDiets = () => { //* Función para capturar las dietas
    return async dispatch =>{
        try {
            return await axios.get(`http://localhost:3001/diets`) //* Consultamos por axios
            .then(result => {
                return dispatch({type: GET_DIETS, payload: result.data}); //* Retornamos las dietas
            })
            .catch(err => { //! Mostramos el error y lo capturamos
                return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getDiets'\n[ Fallo la consulta con el servidor ]\nError:\n\t[ ${err} ]`);
            });
        } catch (error) { //! Mostramos el error y lo capturamos
            return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getDiets'\n[ Fallo la conexión con el servidor ]\nError:\n\t[ ${error} ]`);
        }
    }
}

// export const getUsers = () => { //* Funcion para capturar los usuarios
//     return async dispatch =>{
//         try {
//             return await axios.get(`http://localhost:3001/users`) //* Consultamos por axios
//             .then(result => {
//                 return dispatch({type: GET_USERS, payload: result.data}); //* Retornamos los usuarios
//             })
//             .catch(err => { //! Mostramos el error y lo capturamos
//                 return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getUsers'\n[ Fallo la consulta con el servidor ]\nError:\n\t[ ${err} ]`);
//             });
//         } catch (error) { //! Mostramos el error y lo capturamos
//             return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getUsers'\n[ Fallo la conexión con el servidor ]\nError:\n\t[ ${error} ]`);
//         }
//     }
// }

export const filterDiets = (payload) => { return { type:FILTER_BY_DIETS, payload } } //* Función retorna la dieta que usaremos para filtrar

export const orderName = (payload) => { return { type:ORDER_BY_NAME, payload } } //* Función retorna la dieta ordenada

export const orderHealthScore = (payload) => { return { type:ORDER_BY_HEALTHSCORE, payload } } //* Función retorna la dieta ordenada

export const postRecipes = (payload) => { //* Función para enviar datos a las recetas
    return async dispatch =>{
        try {
            return await axios.post(`http://localhost:3001/recipes`, payload) //* Enviamos los datos por axios
            .then(result => {
                return dispatch({type: POST_RECIPES, payload: result.data}); //* Retornamos el mensaje de confirmación
            })
            .catch(err => { //! Mostramos el error y lo capturamos
                console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'postRecipes'\n[ Fallo la consulta con el servidor ]\nError:\n\t[ ${err} ]`);
                return dispatch({type: POST_RECIPES, payload: 'No se creo la receta'});
            });
        } catch (error) { //! Mostramos el error y lo capturamos
            return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'postRecipes'\n[ Fallo la conexión con el servidor ]\nError:\n\t[ ${error} ]`);
        }
    }
}

// export const postUsers = (payload) => { //* Función para enviar datos a los usuarios
//     return async dispatch =>{
//         try {
//             return await axios.post(`http://localhost:3001/users`, payload) //* Enviamos los datos por axios
//             .then(result => {
//                 return dispatch({type: POST_USERS, payload: result.data}); //* Retornamos el mensaje de confirmación
//             })
//             .catch(err => { //! Mostramos el error y lo capturamos
//                 return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'postUsers'\n[ Fallo la consulta con el servidor ]\nError:\n\t[ ${err} ]`);
//             });
//         } catch (error) { //! Mostramos el error y lo capturamos
//             return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'postUsers'\n[ Fallo la conexión con el servidor ]\nError:\n\t[ ${error} ]`);
//         }
//     }
// }

// export const login = (userName = null, password = null) => { //* Función para capturar todas las recetas o filtrarlas por nombre o id
//     return async dispatch =>{
//         try {
//             return await axios.get(`http://localhost:3001/users?userName=${userName}&password=${password}`) //* Consultamos por axios
//             .then(result => {
//                 return dispatch({type: LOGIN, payload: result.data}); //* Si no filtramos retornamos todas las recetas
//             })
//             .catch(err => { //! Mostramos el error y lo capturamos
//                 return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getRecipes'\n[ Fallo la consulta con el servidor ]\nError:\n\t[ ${err} ]`);
//             });
//         } catch (error) { //! Mostramos el error y lo capturamos
//             return console.log(`CLIENT/SRC/ACTIONS (INDEX)\t'getRecipes'\n[ Fallo la conexión con el servidor ]\nError:\n\t[ ${error} ]`);
//         }
//     }
// }

export const modeStyle = (payload) => { return { type:MODE_STYLE, payload } }

export const stateLink = (payload) => { return { type:STATE_LINK, payload } }


