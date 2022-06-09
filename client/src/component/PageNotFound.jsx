import { Link } from "react-router-dom";
import s from '../Css/PageNotFound.module.css'


const PageNotFound = ()=>{
    return(
        <div className={s.imagen}><br />
        <div className={s.titulo}>
            <h3> Error! La página que buscas no existe! </h3>
        </div>
            <Link to='/home'>
                <button className={s.boton}> Volver </button>
            </Link>
        </div>
    )
}

export default PageNotFound;