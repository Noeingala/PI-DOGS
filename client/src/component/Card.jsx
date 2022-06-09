import React from 'react';
import { Link } from 'react-router-dom';
import s from '../Css/Card.module.css'


export default function Card({name, image, temperament, weight, height, life_span, id}){

        return(
        <div className={s.card}>
            <div>
                <img src={image} className={s.imagen} alt= 'Dog picture'/>
            </div>
            <Link style={{textDecoration:'none'}} to={`/dogs/${id}`}>
            <h3 className={s.titulo}>{name}</h3>
            </Link>
            {/* <h4>Años de Vida: {life_span}</h4> */}
            <h4>Temperamento: {temperament}</h4>
            <p>Peso: {weight}</p>
            <p>Altura: {height}</p>
        </div>
    )
}
