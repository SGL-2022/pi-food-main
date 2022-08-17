import React from "react";
import styles from './Paginated.module.css'

export default function Paginado ({recipesPerPage, allRecipes, paginated}) {

    const pageNumbers = [];
    for (let i = 0 ; i < Math.ceil(allRecipes / recipesPerPage) ; i++){
        pageNumbers.push(i + 1);
    }

    return (
        <div className={styles.paginated}>
            <ul className={styles.ul} >
                {
                    pageNumbers && pageNumbers.map(n => (
                        <li key={n}  >
                            <button onClick= {() => paginated(n)} >{n}</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}