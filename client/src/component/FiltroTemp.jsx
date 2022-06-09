import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, filterTemperament } from "../actions";
import s from '../Css/FilterTemp.module.css'


export default function FilterTemp({setCurrentPage}){
    const dispatch = useDispatch()
    const allTemperaments = useSelector((e)=>e.temperament)
   

    useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch])
    
    const handleFilterTemperament=(e)=>{
        e.preventDefault()
        dispatch(filterTemperament(e.target.value))
        setCurrentPage(1)
    }

    return(
        <div>
            <label>Filtro por Temperamentos: </label>
            <select className={s.select} onChange={e=>handleFilterTemperament(e)}>
                <option value='All'> Todos los Temperamentos </option>
                {
                    allTemperaments && allTemperaments.map(e=>(
                        <option key={e.id} value={e.name}> {e.name} </option>
                    ))
                }
            </select>
        </div>
    )

}
