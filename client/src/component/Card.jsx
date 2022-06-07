import React from 'react';
import s from '../Css/Card.module.css'


export default function Card({name, image, temperament, weight, height, life_span}){
    return(
        <div className={s.card}>
            <div>
                <img src={image} className={s.imagen} alt= 'Dog picture'/>
            </div>
            <h3>{name}</h3>
            {/* <h4>Años de Vida: {life_span}</h4> */}
            <h4>Temperamento: {temperament}</h4>
            <h4>Peso: {weight}</h4>
            {/* <h4>Altura: {height}</h4> */}
        </div>
    )
}