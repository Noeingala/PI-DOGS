import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { sortName } from "../actions";
import s from '../Css/FilterTemp.module.css'

export default function SortName(){
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(sortName())
    },[dispatch])

    function handleSortName(e) {
        e.preventDefault();
        dispatch(sortName(e.target.value));
    }
    return(
        <div>
            <label>Orden Alfabetico: </label>
            <select className={s.select} onChange={e=> handleSortName(e)}>
                <option value='All'> Todos </option>
                <option value='asc'> Ascendente </option>
                <option value='desc'> Descendente </option>
            </select>
        </div>
    )
}