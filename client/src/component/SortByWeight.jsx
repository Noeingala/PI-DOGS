import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { sortByWeight } from "../actions";
import s from '../Css/FilterTemp.module.css'

export default function SortByWeitgh({setCurrentPage}){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(sortByWeight())
    },[dispatch])

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1)
    }
    return(
        <div>
            <label>Orden por peso: </label>
            <select className={s.select} onChange={e=> handleSortByWeight(e)}>
                <option value='All'> Todos </option>
                <option value='small'> Pequeños </option>
                <option value='big'> Grandes </option>
            </select>
        </div>
    )
}