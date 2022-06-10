import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../actions';
import FilterTemp from './FiltroTemp';
import FiltroExistingBreed from './FiltroExistingBreed';
import SortName from './SortName';
import SortByWeight from './SortByWeight';
import s from '../Css/NavBar.module.css'



export default function NavBar({setCurrentPage}){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])   //dependencia a la que tiene que estar atento si hay cambios

    return(
        <div className={s.filtros}>
            <div>
                <FilterTemp setCurrentPage={setCurrentPage}/>
            </div>
            <div>
                <FiltroExistingBreed setCurrentPage={setCurrentPage}/>
            </div> 
            <div>
                <SortByWeight setCurrentPage={setCurrentPage}/>
            </div>
            <div>
                <SortName setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    )
}
