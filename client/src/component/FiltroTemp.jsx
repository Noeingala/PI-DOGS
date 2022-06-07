import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, filterTemperament } from "../actions";
import s from '../Css/FilterTemp.module.css'


export default function FilterTemp(){
    const dispatch = useDispatch();
    const allTemperaments = useSelector((e)=>e.temperament)
    //const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        dispatch(getTemperaments())
        //setCurrentPage(1)
    },[dispatch])

    const handleFilterTemperament=(e)=>{
        e.preventDefault()
        dispatch(filterTemperament(e.target.value))
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
