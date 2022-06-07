import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogs } from '../actions';
import FilterTemp from './FiltroTemp';
import FiltroExistingBreed from './FiltroExistingBreed';
import SortName from './SortName';
import SortByWeight from './SortByWeight';
import s from '../Css/NavBar.module.css'



export default function NavBar(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDogs())
    },[dispatch])

    return(
        <div className={s.filtros}>
            <div>
                <FilterTemp/>
            </div>
            <div>
                <FiltroExistingBreed/>
            </div>
            <div>
                <SortByWeight/>
            </div>
            <div>
                <SortName/>
            </div>
        </div>
    )
}
