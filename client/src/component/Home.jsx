import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from './Card';
import Paginado from './Paginado';
import NavBar from "./NavBar";
import { getDogs } from "../actions";
import s from '../Css/Home.module.css'
import SearchBar from './SearchBar'
import ss from '../Css/SearchBar.module.css'


export default function Home(){
    const dispatch = useDispatch()
    const allDogs = useSelector((e) => e.allDogs)         //traemos lo que hay en el estado
    const dogs = useSelector((e) => e.dogs)
 
    const [currentPage, setCurrentPage] = useState(1)     //guardo en el estado local, la pagina actual 
    const [dogsPorPag, setDogsPorPag ] = useState(8)      //guardo cuantos personajes quiero por pag
    const indiceUltimoDog = currentPage * dogsPorPag
    const indicePrimerDog = indiceUltimoDog - dogsPorPag

    const paginado = (numPag)=>{
        setCurrentPage(numPag)
    };

    useEffect(() => {
        setCurrentPage(1);
      }, [dispatch]);
    
    function handleClick(e){
    e.preventDefault()
    dispatch(getDogs())
    };  
    
    const mostrarCards = (dogs) => {
        const currentDogs = dogs.slice(indicePrimerDog, indiceUltimoDog)
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
                    return(
                        <Link
                        key={e.id}
                        to={"/dogs/" + e.id}
                        >
                        <Card key={e.id}
                              name={e.name} 
                              image={e.image} 
                              life_span={e.life_span}
                              temperament={e.temperament} 
                              weight={e.weight + ' Kgs'}
                              height={e.height}/>
                        </Link>
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
            <Link to="/dog">
                <button className={ss.button}> Crea tu Raza </button>
            </Link>
                <SearchBar/>
            </div>
            <div>
                <NavBar />
            </div>
            <div>
                {dogs.length > 0 ? mostrarCards(dogs) : mostrarCards(allDogs)}
            </div>
            <div className={s.divs}>
                <Link to="/">
                    <button className={ss.button}> Regresar </button>
                </Link>
                    <button className={ss.button} onClick={e=>{handleClick(e)}}> Recargar Perritos </button>
            </div>
        </div>
    )
};

































// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getDogs } from '../actions';
// import  Card  from './Card.jsx';
// import { Link } from 'react-router-dom';
// import FiltroTemp from './FiltroTemp';
// import FiltroExistingBreed from './FiltroExistingBreed';
// import Paginado from './Paginado';



// export default function Home(){
//     const dispatch = useDispatch()
//     const allDogs = useSelector((state) => state.allDogs) //me trae del reducer el estado 

//     const [currentPage, setCurrentPage] = useState(1)     //guardo en el estado local, la pagina actual 
//     const [dogsPorPag, setDogsPorPag] = useState(8)       //guardo cuantos personajes quiero por pag
//     const indiceUltimoDog = currentPage * dogsPorPag
//     const indicePrimerDog = indiceUltimoDog - dogsPorPag
//     //esta const guarda los perros que se renderizan dependiendo la pagina
//     const currentDogs = allDogs.slice(indicePrimerDog, indiceUltimoDog) //corta o separa el arreglo

//     const paginado = (numPag)=>{
//         setCurrentPage(numPag)
//     }


//     useEffect(()=>{
//         dispatch(getDogs())
//     },[dispatch])

//     function handleClick(e){
//         e.preventDefault()
//         dispatch(getDogs())
//     }

//     return(
//         <div>
//             <Link to='/dogs'> Crea tu raza </Link>
//             <h1>Wof-Wof</h1>
//             <button onClick={e=>{handleClick(e)}}> Recargar Perritos </button>
//             <div>
//                 <FiltroTemp/>
//             </div>
//             <div>
//                 <FiltroExistingBreed/>
//             </div>
//             <div>
//                 <select>
//                     <option value='All'> Orden Por Peso </option>
//                     <option value='small'> Pequeños </option>
//                     <option value='big'> Grandes </option>
//                 </select>
//             <div>
//                 <select>
//                     <option value='All'> Alfabeticamente </option>
//                     <option value='asc'> Ascendente </option>
//                     <option value='desc'> Descendente </option>
//                 </select>
//             <Paginado 
//             dogsPorPag={dogsPorPag}
//             allDogs={allDogs.length}
//             paginado={paginado}/>    
//             </div>
//             {
//                 currentDogs?.map(e=>{
//                     return(
//                         <Card key={e.id}
//                               name={e.name} 
//                               image={e.image} 
//                               life_span={e.life_span}
//                               temperament={e.temperament} 
//                               weight={e.weight}
//                               height={e.height}/>
//                     )
//                 })
//             }
//             </div>
            
//         </div>
//     )
// }