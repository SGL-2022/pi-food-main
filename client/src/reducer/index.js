//TODO Almacenaremos datos globales

import * as A from '../actions/index.js'; //* Importamos todas las acciones

//* Declaramos los estados globales 
/**users: [], login: [], */
export const initialState = { allRecipes: [], filterRecipes: [], detailRecipe: [], diets: [], request: '', modeStyle:true, link:[true, false] };
const cases = {}; //* Declaramos los casos para sus respectivas acciones

cases[A.GET_RECIPES] = (state, payload) => {
    let order = payload.sort((a, b) => { //* Sortea los elementos por el nombre
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
    });
    return { ...state, allRecipes: order, filterRecipes: order };
} //* Almacena todas las recetas
cases[A.GET_DIETS] = (state, payload) => { return { ...state, diets: payload }; } //* Almacena las dietas
// cases[A.GET_USERS] = (state, payload) => { return { ...state, users: payload}; } //* Almacena los usuarios existentes
cases[A.FILTER_BY_DIETS] = (state, payload) => { //* Filtra las recetas segun la dieta
    const all = state.allRecipes; //* Capturamos todas las recetas del estado
    const filter = all.filter(item => item.diets.find(element => element === payload)); //* filtramos las recetas
    return { ...state, filterRecipes: filter.length ? filter : all }; //* Almacena las recetas filtradas
}
cases[A.ORDER_BY_NAME] = (state, payload) => { //* Almacena todas las recetas filtradas ordenadas por nombre
    let order = payload === 'asc' ? state.filterRecipes.sort((a, b) => { //* Sortea los elementos por el nombre
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
    }) : state.filterRecipes.sort((a, b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
        return 0;
    });
    return { ...state, filterRecipes: order }; //* Almacena las recetas ordenadas
}
cases[A.ORDER_BY_HEALTHSCORE] = (state, payload) => { //* Almacena todas las recetas filtradas por nivel de comida
    let order = payload === 'menor_mayor' ? state.filterRecipes.sort((a, b) => { //* Sortea los elementos por el nombre
        if(a.healthScore > b.healthScore) return 1;
        if(b.healthScore > a.healthScore) return -1;
        return 0;
    }) : state.filterRecipes.sort((a, b) => {
        if(a.healthScore > b.healthScore) return -1;
        if(b.healthScore > a.healthScore) return 1;
        return 0;
    });
    return { ...state, filterRecipes: order }; //* Almacena las recetas ordenadas
}
cases[A.SEARCH_BY_NAME] = (state, payload) => { return { ...state, filterRecipes: payload } } //* Almacena las recetas segun el nombre
cases[A.SEARCH_BY_ID] = (state, payload) => { return { ...state, detailRecipe: payload } } //* Almacena las recetas segun el id
cases[A.POST_RECIPES] = (state, payload) => { return { ...state, request: payload.Request }; } //* Almacena la respuesta del envio
// cases[A.POST_USERS] = (state, payload) => { return { ...state, request: payload }; } //* Almacena la respuesta del envio
// cases[A.LOGIN] = (state, payload) => { return { ...state, login: payload } } //* Almacena al usuario que inicio sesión
cases[A.MODE_STYLE] = (state, payload) => { return { ...state, modeStyle: payload }; }
cases[A.STATE_LINK] = (state, payload) => { return { ...state, link: payload }; }

export const rootReducer = (state = initialState, {type, payload}) =>{ //* Función que permitira ejecutar las acciones a los estados
    return cases[type] ? cases[type](state, payload) : state; //* Segun la acción almacenada envia el estado y los datos sino retorna los estados
}