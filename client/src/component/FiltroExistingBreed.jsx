import React from "react";
import { useDispatch } from "react-redux";
import { filterExistingBreed } from "../actions";
import s from '../Css/FilterTemp.module.css'


export default function FiltroExistingBreed({setCurrentPage}){
    const dispatch = useDispatch()

    const handleFilterExistingBreed = (e)=>{
        e.preventDefault()
        dispatch(filterExistingBreed(e.target.value))
        setCurrentPage(1)
    }

    return(
        <div>
            <label>Razas creadas o Existentes: </label>
            <select className={s.select} onChange={e=>handleFilterExistingBreed(e)}>
                <option value='todo'> Todas </option>
                <option value='db'> Existentes en la Base de Datos </option>
                <option value='api'> Existentes en la Api </option>
            </select>
        </div>
    )
}