import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../actions";
import { validacion } from '../component/Errores';
import s from '../Css/DogCreate.module.css';
import ss from '../Css/DogCreate2.module.css'
import err from '../Css/Errores.module.css'

export default function DogCreate(){
    const dispatch = useDispatch()
    const allTemperaments = useSelector((e) => e.temperament)
    const [errores, setErrores] = useState({});

    const [input, setInput] = useState({
        name: '',
        minHeight: '', 
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minlife_span: '',
        maxlife_span: '',
        image: '',
        temperament: [],
        createdInDb: false,
    });


    useEffect(() => {
        dispatch(getTemperaments());
      },[dispatch]);
    
    //setea el estado input
    function handleChange(e){
        // if(!input.name.includes(e.target.value))
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrores(
            validacion({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    };

    function handleSubmit(e){
         e.preventDefault()
        //  console.log(input)
        let creado = {
            name: input.name,
            height: `${input.minHeight} - ${input.maxHeight}`,
            weight: `${input.minWeight} - ${input.maxWeight}`,
            life_span: `${input.minlife_span} - ${input.maxlife_span} Años`,
            image: input.image,
            temperament: input.temperament
        }
        dispatch(postDog(creado))
        setInput({
            name: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            minlife_span: '',
            maxlife_span: '',
            image: '',
            temperament: [],
            createdInDb: true,
        });
        alert('Perro Creado Correctamente')
    };

    function handleSelectTemperament(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    };

    function handleDelete(e) {
        e.preventDefault();
          setInput({
          ...input,
          temperament: input.temperament.filter((temp) => temp !== e.target.value)
        })
    };

    return(
        <div className={s.imagen}><br />
            <h1 className={s.titulo}>Creá tu Perro!</h1>
            <form>
                <div className={s.form}>
                <div>
                    <label>Nombre: </label>
                    <input type='text'
                           name='name'
                           placeholder='Nombre de la Raza'
                           value={input.name}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    />{errores.name && (<p className={err.err}>{errores.name}</p>)}
                </div><br />
                <div>
                    <label>Altura Minima: </label>
                    <input 
                           type='number'
                           name='minHeight'
                           placeholder='Centimetros'
                           value={input.minHeight}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    /><br />{errores.minHeight && (<p className={err.err}>{errores.minHeight}</p>)}
                    <label>Altura Máxima: </label>
                    <input type='number'
                           name='maxHeight'
                           placeholder='Centimetros'
                           value={input.maxHeight}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    />{errores.maxHeight && (<p className={err.err}>{errores.maxHeight}</p>)}
                </div><br />
                <div>
                    <label>Peso Minimo: </label>
                    <input type='number'
                           name='minWeight'
                           placeholder='Kilogramos'
                           value={input.minWeight}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    /><br />{errores.minWeight && (<p className={err.err}>{errores.minWeight}</p>)}
                    <label>Peso Máximo: </label>
                    <input type='number'
                           name='maxWeight'
                           placeholder='Kilogramos'
                           value={input.maxWeight}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    />{errores.maxWeight && (<p className={err.err}>{errores.maxWeight}</p>)}
                </div><br />
                <div>
                    <label>Minimo de Años de Vida: </label>
                    <input type='number'
                           name='minlife_span'
                           placeholder='Años'
                           value={input.minlife_span}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    /><br />{errores.minlife_span && (<p className={err.err}>{errores.minlife_span}</p>)}
                    <label>Máximo de Años de Vida: </label>
                    <input type='number'
                           name='maxlife_span'
                           placeholder='Años'
                           value={input.maxlife_span}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    />{errores.maxlife_span && (<p className={err.err}>{errores.maxlife_span}</p>)}
                </div><br />
                <div>
                    <label>Imagen: </label>
                    <input type='text'
                           name='image'
                           placeholder='URL'
                           value={input.image}
                           onChange={(e) => handleChange(e)}
                           className={ss.select}
                    />{errores.image && (<p className={err.err}>{errores.image}</p>)}
                </div><br />
                <div>
                    <label>Temperamento: </label>
                    <select onChange={(e) => handleSelectTemperament(e)}>
                        {allTemperaments && allTemperaments.map((e,i)=>
                            {
                                return <option value={e.name} key={i}>{e.name}</option>
                            }
                        )}
                    </select>
                </div><br />
                <div className={s.div}>   
                    { input.temperament.map((nombre, i) => {  //renderiza un mapeo de lo que hay en el estado
                        return(
                            <button value={nombre} key={i} className={ss.button} onClick={(e) => handleDelete(e)}>{nombre}</button>
                        )  
                    })}
                </div><br />
                <div>
                    {       
                        (!input.name || !input.minHeight || !input.maxHeight || !input.minWeight || !input.maxWeight || !input.minlife_span || !input.maxlife_span || !input.image || input.temperament===undefined)
                        || (errores.name || errores.minHeight || errores.maxHeight || errores.minWeight || errores.maxWeight || errores.minlife_span || errores.maxlife_span || errores.image) 
                        ? null : <button className={ss.button} type="submit" onClick={(e) => handleSubmit(e)}> Crear Perro! </button>
                    }
                </div>
                </div>
            </form>
            <div>
                <Link to='/home'>
                    <button className={s.button}>Volver</button>
                </Link>
            </div>
        </div>
    )
}