import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import s from '../Css/Detail.module.css'


export default function Detail(){
    const { id } = useParams();
    const dogDetail = useSelector((e) => e.detail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    let aux = [];
    if(dogDetail.length > 0){
        aux = Object.keys(dogDetail[0])
    }

    const temp = aux.length > 0 ? aux.includes('temperaments') ? (dogDetail[0].temperaments.map(t=>{
           return t.name })).join(', ') : dogDetail[0].temperament : null


//    console.log(dogDetail[0])
    return (
        <div className={s.imagen}>
            <div>
                {
                dogDetail.length > 0 ? 
                <div className={s.contenedor}>
                    <div >
                        <img className={s.imagdetalle} src={dogDetail[0].image} alt= 'no tiene imagen'/>
                    </div>
                    <div className={s.info}>
                        <div className={s.titulo}>
                            <h1>{dogDetail[0].name}</h1>
                        </div>
                        <div >
                            <h4>Temperamento: </h4>
                            { temp && 
                            <p>{temp}</p>}
                            <h4>Altura: {dogDetail[0].height + ' cm'}</h4>
                            
                            <h4>Peso: {dogDetail[0].weight + ' Kgs'}</h4>
                            
                            <h4>Años de Vida: {dogDetail[0].life_span}</h4>
                              
                        </div>
                    </div>
                </div> : 
                <div className={s.cargando}> <h3> Cargando... </h3> </div>
                }
            </div>
            <div>
                <Link to='/home'>
                    <button className={s.boton}>Volver</button>
                </Link>
            </div>
        </div>
    ) 

}