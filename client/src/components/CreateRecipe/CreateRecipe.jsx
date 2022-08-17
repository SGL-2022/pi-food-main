import React, {useEffect , useState} from "react";
import { getDiets, postRecipes } from '../../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from './CreateRecipe.module.css'
import NavBar from "../NavBar/NavBar";
import imgVacio from "../../assets/img/vacio.jpg"

function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.name) errors.name= 'campo obligatorio'
    if(!input.summary) errors.summary= 'campo obligatorio'
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore='campo obligatorio'
    return errors
}

export default function CreateRecipe() {

    const dispatch = useDispatch();
    let listDiets = useSelector((state) => state.diets );
    let respuesta = useSelector((state) => state.request );
    const [errors, setErrors]=useState({});
    const [steps, setSteps]=useState({numStep:0, step:''});
    const [input, setInput] = useState({
        name :'',
        summary:'',
        healthScore:0,
        image:'',
        steps:[],
        diets:[]
    })

    useEffect(() => { dispatch(getDiets()); },[dispatch])

    function handleChange(e){
        setInput({ ...input, [e.target.name] : e.target.value });
        setErrors(controlForm({ ...input,[e.target.name] : e.target.value }));
    }

    function handleSelect(e){
        setInput({ ...input, diets:[...input.diets, e.target.value] });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipes(input))
        setInput({
            name :'',
            summary:'',
            healthScore:'',
            image:'',
            steps:[],
            diets:[]
        })
    }

    function handleDelete(e){
        setInput({ ...input, diets: input.diets.filter(diet => diet !== e ) });
    }

    function handleAddStep(e){
        e.preventDefault();
        setSteps({numStep:1, step: e.target.value});
    }

    function handleAddSteps(e){
        e.preventDefault();
        setInput({ ...input, steps: [...input.steps, {numStep:steps.numStep + input.steps.length, step:steps.step}]});
        setSteps({numStep:0, step:''});
    }

    function handDeleteStep(e){
        setInput({ ...input, steps: input.steps.filter(s => s.numStep !== e.numStep ) });
    }

    function activeButton(){
        if(input.name.length || input.summary.length || input.healthScore.length) return (<button type='submit' className={styles.create}>Crear receta</button>);
        return (<div></div>);
    }

    return (
        <section>
            <NavBar/>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <h1>Crear Receta</h1>
                    </div>
                    <div className={styles.form}>
                        <form onSubmit={(e) => {handleSubmit(e)}} >
                            <div className={styles.input}>
                                <label>Titulo:</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={input.name}
                                    onChange={(e) => {handleChange(e)}}
                                />
                                { errors.name && ( <p className={styles.error}>{errors.name}</p> ) }
                            </div>
                            <div className={styles.input}>
                                <label>Resumen:</label>
                                <input
                                    type='text'
                                    name='summary'
                                    value={input.summary}
                                    onChange={(e) => {handleChange(e)}}
                                />
                                { errors.summary && ( <p className={styles.error}>{errors.summary}</p> ) }
                            </div>
                            <div className={styles.input}>
                                <label>Puntuacion saludable:</label>
                                <input
                                    type='number'
                                    name='healthScore'
                                    value={input.healthScore}
                                    onChange={(e) => {handleChange(e)}}
                                />
                                { errors.healthScore && ( <p className={styles.error}>{errors.healthScore}</p> ) }
                            </div>
                            <div className={styles.input}>
                                <label>imagen:</label>
                                <input
                                    type='url'
                                    name='image'
                                    placeholder="https://example.com"
                                    pattern="https://.*"
                                    value={input.image}
                                    onChange={(e) => {handleChange(e)}}
                                />
                            </div>
                            <div className={styles.input}>
                                <label>Paso a paso:</label>
                                <input
                                    type='text'
                                    name='steps'
                                    value={steps.step}
                                    onChange={(e) => {handleAddStep(e)}}
                                />
                                <button onClick={(e)=>{handleAddSteps(e)}}>+</button>
                            </div>
                            <div className={styles.input}>
                                <label>Dietas:</label>
                                <select onChange={(e) => handleSelect(e)} >
                                    { listDiets?.map((t, i) => { return <option key={'D' + i} value={t.name}> {t.name} </option> }) }
                                </select >
                            </div>
                            <div className={styles.input}>
                                {
                                    errors.hasOwnProperty('name') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('healthScore')
                                    ?
                                    <p className={styles.error}> por favor, completar todos los campos obligatorios</p>
                                    :
                                    activeButton()
                                }
                            </div>
                        </form>
                        <div className={styles.image}>
                            <img src={input.image || imgVacio} alt="Visualizar"/>
                        </div>
                    </div>
                    <div>
                        {
                            input.diets.map((e, i) => {
                                return(
                                    <div key={'E'+i} className={styles.diets}>
                                        <h5>{e}</h5>
                                        <button
                                        onClick={() => handleDelete(e)}>X</button>
                                    </div>
                            )})
                        }
                    </div>
                    <div>
                        {
                            input.steps.map((e, i) => {
                                return (
                                    <div key={'S'+i}>
                                        <h6>{e.numStep}</h6>
                                        <p>{e.step}</p>
                                        <button onClick={()=> handDeleteStep(e)}>X</button>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>{respuesta}</div>
                </div>
            </div>
        </section>
    );
}