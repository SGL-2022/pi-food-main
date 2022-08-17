import React from "react";
import styles from './Card.module.css'
import imgVacio from "../../assets/img/vacio.jpg"

export default function Card ({ id, name, img, diets }) {

    return (
        <div key={id} className={styles.card}>
            <div className={styles.imgContent} >
                <img src={img || imgVacio} alt="imagen"/>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h4>{ name }</h4>
                </div>
                <div className={styles.list}>
                    { diets.map((t, i) => <p key={i}> { t } </p>) }
                </div>
            </div>
        </div>
    )
}