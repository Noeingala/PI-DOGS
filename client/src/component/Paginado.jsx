import React from 'react';
import s from '../Css/Paginado.module.css';

export default function Paginado({dogsPorPag, allDogs, paginado}){
    const numPag = []
    for(let i=0; i<=Math.ceil(allDogs/dogsPorPag); i++){
        numPag.push(i+1)
    }
    return (
        <nav>
            <ul className={s.contenido}>
                {
                numPag && numPag.map(numero =>(
                    <button key={numero} className={s.button}>  
                    <a onClick={()=>paginado(numero)}>{numero}</a>
                    </button>
                ))
                }
            </ul>
        </nav>
    )
}       