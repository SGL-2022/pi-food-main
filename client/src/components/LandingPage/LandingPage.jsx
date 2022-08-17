import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return (
        <section className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>•. Recetas .•</h1>
                <Link to= '/home' className={styles.link}>
                    <span className={styles.button}>INGRESAR</span>
                </Link>
            </div>
        </section>
    )
}