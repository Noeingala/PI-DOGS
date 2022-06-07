import React from 'react';
import { Link } from 'react-router-dom';
import s from '../Css/LandingPage.module.css'


export default function LandingPage(){
    return(
        <div className={s.imagen}><br />
        <div className={s.titulo}>
            <h1> Bienvenidos a </h1>
            <h1> esta aventura! </h1>
        </div>
            <Link to='/home'>
                <button className={s.button}> Ingresar </button>
            </Link>
        </div>
    )
};