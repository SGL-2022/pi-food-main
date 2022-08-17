import React from "react";
import { getRecipes } from '../../actions/index'
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import styles from './Detail.module.css'
import imgVacio from "../../assets/img/vacio.jpg"
import NavBar from "../NavBar/NavBar";

export default function Detail (){
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect (() => { dispatch(getRecipes(id, null)); }, [id, dispatch]);
    const details = useSelector((state) => state.detailRecipe);

    function showDetail (){
        let orderStep = details[0].steps.sort((a, b) => { //* Sortea los elementos por el nombre
            if(a.numStep > b.numStep) return 1;
            if(b.numStep > a.numStep) return -1;
            return 0;
        }) || details[0].steps;
        return (
            <div className={styles.content}>
                <NavBar/>
                {
                    !details.hasOwnProperty('Request') ?
                    <div className={styles.detailContent}>
                        <h1 className={styles.title}> {details[0].name} </h1>
                        <img className={styles.image} alt= 'default imagen'
                            src={details[0].image ? details[0].image : imgVacio}/>
                        <div className={styles.typeDiet} >Type Diet: {details[0].diets.map((t, i) => {
                            return (
                                <h3 key={'d'+ i}>{t}</h3>
                            );
                        })}</div>
                        <h5 className={styles.type}>summary: { details[0].summary}</h5>
                        <h5 className={styles.type}>healthScore: {details[0].healthScore}</h5>
                        <div className={styles.type}>steps:
                            {
                                details[0].steps.length ? orderStep.map((e, i) => {
                                    return (
                                            <div key={'Key' + i}>
                                                <h3>Paso {e.numStep}</h3>
                                                <p>{e.step}</p>
                                            </div>
                                    );
                                }) : <h3>No hay pasos</h3>
                            }
                        </div>
                    </div>
                    : <div>{details[0].Request}</div>
                }
            </div>
        );
    }

    return (
        <div>
            { details.length ? showDetail() : <div> <h2> loading... </h2> </div> }
        </div>
    )
}