import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions";
import CreateUser from "../CreateUser/CreateUser"
import styles from './Login.module.css';

export default function Login () {

    const [user, setUser] = useState({usuario:'', contraseña:''});
    const dispatch = useDispatch();
    const getLogin = useSelector((state) => state.login );
    let stateLogin = true;

    function handleChange(e){
        setUser({ ...user, [e.target.name] : e.target.value });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(login(user.usuario, user.contraseña));
        setUser({usuario:'', contraseña:''});
    }

    function errorShow(){
        if(getLogin.hasOwnProperty('Error')){
            return (<div>{getLogin.Error}</div>);
        }
        return (<div></div>);
    }

    function handleStateLogin(e){
        e.preventDefault();
        stateLogin = false;
    }

    function showLogin(){
        return (
            <div>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <label>Usuario: </label>
                        <input type='text' placeholder='usuario' name="usuario" value={user.usuario} onChange={(e) => {handleChange(e)}} className={styles.input}/>
                    </div>
                    <div>
                        <label>Contraseña: </label>
                        <input type='password' placeholder='contraseña' name="contraseña" value={user.contraseña} onChange={(e) => {handleChange(e)}} className={styles.input}/>
                    </div>
                    <button type='submit' className={styles.btnsearch}>Ingresar</button>
                </form>
                { getLogin.length ? <div>{getLogin[0].fullName}</div> : errorShow() }
                <Link to = '/register'><button onClick = {e => handleStateLogin(e)}>Registrarse</button></Link>
            </div>
        );
    }

    return (
        <div>
            {stateLogin ? showLogin() : <CreateUser/>}
        </div>
    );
}