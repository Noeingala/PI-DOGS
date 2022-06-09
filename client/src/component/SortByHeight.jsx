import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { sortByHeight } from "../actions";
import s from '../Css/SortByHeight.module.css'


export default function SortByHeight(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(sortByHeight())
    },[dispatch])

    function handleSortByHeight(e) {
        e.preventDefault();
        dispatch(sortByHeight(e.target.value));
    }
    return(
        <div>
            <label className={s.cont}>Orden por altura: </label>
            <select className={s.select} onChange={e=> handleSortByHeight(e)}>
                <option value='All'> Todos </option>
                <option value='Asc'> Asc </option>
            </select>
        </div>
    )
}