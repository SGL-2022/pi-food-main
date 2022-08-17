import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, getDiets, filterDiets, orderName, orderHealthScore, modeStyle } from "../../actions";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import NavBar from "../NavBar/NavBar";
import styles from './Home.module.css';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.filterRecipes );
    const allDiets = useSelector((state) => state.diets );
    const stateMode = useSelector((state) => state.modeStyle );
    const[orden, setOrden] = useState('');
    const[order, setOrder] = useState('');
    const[currentPage, setCurrentPage] =useState(1);
    const[recipesPerPage, setRecipesPerPage]=useState(9);
    const indexLastRecipe = currentPage * recipesPerPage;
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDiets());
        dispatch(getRecipes());
        dispatch(modeStyle(stateMode));
    }, [dispatch, stateMode]);

    function hide(){
        return [order, orden, setRecipesPerPage];
    }
    hide();

    function handleFilterDiets (e) { dispatch(filterDiets(e.target.value)); }

    function handleOrderName (e){
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`);
    }

    function handleOrderHealthScore (e) {
        e.preventDefault();
        dispatch(orderHealthScore(e.target.value));
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`);
    }

    return (
        <section>
            <NavBar/>
            <div className={styles.filter}>
                <div>
                    <select title="ordenar1" onChange={e => handleOrderName(e)} className={styles.drop}>
                            <option value="asc">ascendente(A-Z)</option>
                            <option value="desc">descendente(Z-A)</option>
                    </select>
                </div>
                <div>
                    <select  title="ordenar2" onChange={e => handleOrderHealthScore(e)} className={styles.drop}>
                        <option value="mayor_menor">mayor a menor por puntuación</option>
                        <option value="menor_mayor">menor a mayor por puntuación</option>
                    </select>
                </div>
                <div>
                    <select  title="filtrar" onChange={e => handleFilterDiets(e)} className={styles.drop}>
                        <option value='Todos'>Todos</option>
                        {
                            allDiets.map(item => {
                                return (<option key={item.id} value={item.name}>{item.name}</option>);
                            })
                        }
                    </select>
                </div>
            </div>
            <Paginated
                recipesPerPage = { recipesPerPage }
                allRecipes = { allRecipes.length }
                paginated = { paginated }
            />
            <div className={styles.cards}>
                {
                    currentRecipes.length ?
                    currentRecipes?.map( e => {
                        if(e.hasOwnProperty('Request')) return (
                            <div key={'Req1'}>{e.Request}</div>
                            );
                        return (
                            <Link to={'/recipes/' + e.id} key = {e.id}>
                                <Card
                                    id={e.id}
                                    name={e.name}
                                    img={e.image}
                                    diets={e.diets}
                                />
                            </Link>
                                )
                    }) : <div>...loading</div>
                }
            </div>
        </section>
    )
}