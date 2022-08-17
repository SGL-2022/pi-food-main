import React from "react"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, modeStyle, stateLink } from "../../actions";
import styles from './NavBar.module.css';
import logo from "../../assets/img/logo.png"

export default function NavBar () {

    const dispatch = useDispatch();
    const stateMode = useSelector((state) => state.modeStyle );
    const alink = useSelector((state) => state.link );
    //const allRecipes = useSelector((state) => state.filterRecipes );
    const[search, setSearch] = useState('');
    const[active, setActive] = useState(true);
    let activeMenu = active ? styles.menuButton : `${styles.menuButton} ${styles.isActive}`;
    let activeHome = alink[0] ? styles.isActiveLink : "";
    let activeCreate = alink[1] ? styles.isActiveLink : "";

    useEffect(() => {
        dispatch(modeStyle(stateMode));
        dispatch(stateLink(alink));
    }, [dispatch, stateMode, alink]);

    function handleSubmit (e){
        e.preventDefault(e)
        dispatch(getRecipes(null, search));
        setSearch('');
    }

    function handleInputName (e){
        setSearch(e.target.value);
    }

    function handleGetRecipes(){
        dispatch(getRecipes());
        return dispatch(stateLink([true, false]));
    }

    function handleActive(){
        return dispatch(stateLink([false, true]));
    }

    function buttonMenu(){
        if(active) return setActive(false);
        return setActive(true);
    }

    return(
        <nav>
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.profile}>
                        <img className={styles.logo} src={logo} alt="Logo" />
                        <span className={styles.textLogo}>Recetas</span>
                    </div>
                    <div className={styles.menu}>
                        <span onClick = {() => handleGetRecipes()} className={styles.home + " " + activeHome}>
                            <Link to='/home' onClick = {() => handleGetRecipes()} >
                                Inicio
                            </Link>
                        </span>
                        <span onClick = {() => handleActive()} className={styles.create + " " + activeCreate}>
                            <Link to = '/recipe' onClick = {() => handleActive()}>
                                Crear Receta
                            </Link>
                        </span>
                        <div className={styles.search}>
                            <form onSubmit={(e) => {handleSubmit(e)}}>
                                <input type='text'
                                placeholder='Buscar...'
                                value={search}
                                onChange={(e) => {handleInputName(e)}}
                                className={styles.input}></input>
                                <button  type='submit'
                                className={styles.button}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <button onClick={()=>buttonMenu()} className={activeMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}