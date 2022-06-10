import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from './Card';
import Paginado from './Paginado';
import NavBar from "./NavBar";
import { getDogs } from "../actions";
import s from '../Css/Home.module.css';
import SearchBar from './SearchBar';
import SortByHeight from "./SortByHeight";
import ss from '../Css/SearchBar.module.css'


export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.allDogs)           //traemos lo que hay en el estado
    const dogs = useSelector((state) => state.dogs)
 
    const [currentPage, setCurrentPage] = useState(1)               //guardo en el estado local, la pagina actual 
    let [dogsPorPag, setDogsPorPag] = useState(8)                   //guardo cuantos personajes quiero por pag
    const indiceUltimoDog = currentPage * dogsPorPag                //sobre la pag actual multiplicamos por los perros por pag 
    const indicePrimerDog = indiceUltimoDog - dogsPorPag    
   
    const paginado = (numPag)=>{                                    //le paso un num de pagina y me setea a ese num
        setCurrentPage(numPag)
    };

    useEffect(() => {
        setCurrentPage(1);
      }, [dispatch]);
    
    function handleClick(e){
    e.preventDefault()
    dispatch(getDogs())
    };  
    
    const mostrarCards = (allDogs) => {
        const currentDogs = allDogs.slice(indicePrimerDog, indiceUltimoDog)     //toma solo esa parte del arreglo
        return(
            <div>
                <div>
                <div>
                    <Paginado 
                    dogsPorPag={dogsPorPag}
                    allDogs={allDogs.length}
                    paginado={paginado}/>
                </div>
                
                <div className={s.cards}>
                {
                currentDogs?.map(e=>{
                    const t = e.temperaments ?( e.temperaments.map(t=>{
                        return t.name
                    })).join(', ') : e.temperament
                    

                    return(
                        <Card key={e.id}
                              id={e.id}
                              name={e.name} 
                              image={e.image} 
                              life_span={e.life_span}
                              temperament={t} 
                              weight={e.weight + ' Kgs'}
                              height={e.height}/>
                    )
                })
                }
                </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <div className={ss.gral}>
            <Link to='/dog'>
                <button className={ss.button}> Crea tu Raza </button>
            </Link>
                <SearchBar setCurrentPage={setCurrentPage}/>
                <SortByHeight/>
            </div>
            <div>
                <NavBar setCurrentPage={setCurrentPage}/> 
            </div>
            <div>
                {dogs.length > 0 ? mostrarCards(dogs) : mostrarCards(allDogs)}
            </div>
            <div className={s.divs}>
                <Link to='/'>
                    <button className={ss.button}> Regresar </button>
                </Link>
                    <button className={ss.button} onClick={e=>{handleClick(e)}}> Recargar Perritos </button>
            </div>
        </div>
    )
};
