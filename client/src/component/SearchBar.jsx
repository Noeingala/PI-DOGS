import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getName, getDogs } from "../actions/index";
import s from '../Css/SearchBar.module.css'

export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);

    
//       if(name.length>1){
//     dispatch(getName(name));
//   } else{
//     dispatch(getDogs());
//   }
}
    function handleSubmit(e){
        e.preventDefault();
        setName("");
        dispatch(getName(name));
        
    }
  
return (
    <div>
    <div>
        <input
        className={s.input}
        type="text"
        placeholder='Buscar por nombre...'
        value={name}
        onChange={(e) => handleInputChange(e)}
        />
        <button className={s.button} type='submit' onClick={(e) => handleSubmit(e)}> Buscar </button>
    </div> 
    </div>
  );
}
