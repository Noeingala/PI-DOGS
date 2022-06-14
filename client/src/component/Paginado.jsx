import React from "react";
import s from '../Css/Paginado.module.css';

export default function Paginado({ dogsPorPag, allDogs, paginado }) {
    const numPag = [];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPorPag); i++) {
        numPag.push(i);
      }

      return (
        // <nav>
        //   {
        //     numPag?.map(number =>{
        //       let active = (activePage === number)
        //       return (
        //         <button key={number} onClick={() => paginado(number)} className={s.activebutton ? active : 'inactive'}>{number}</button>
        //       )
        //     })
        //   }
        // </nav>
        <nav>
            <ul className={s.contenido}>
            {numPag && numPag.map((number) => {
              return (
                <button key={number} onClick={() => paginado(number)} className={s.button}>{number}</button>
              );
            })}
            </ul>
        </nav>
      );
    }



// import React from 'react';
// import s from '../Css/Paginado.module.css';

// export default function Paginado({dogsPorPag, allDogs, paginado}){
//     const numPag = []
//     for(let i=0; i<=Math.ceil(allDogs/dogsPorPag); i++){
//         numPag.push(i+1)
//     }
//     return (
//         <nav>
//             <ul className={s.contenido}>
//                 {
//                 numPag && numPag.map(numero =>(
//                     <button key={numero} className={s.button}>  
//                     <a onClick={()=>paginado(numero)}>{numero}</a>
//                     </button>
//                 ))
//                 }
//             </ul>
//         </nav>
//     )
// }