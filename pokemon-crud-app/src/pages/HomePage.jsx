import { Link } from "react-router-dom"

const HomePage = () => {
    return(
        <div>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/signup">Crear cuenta</Link>
        </div>
    )
}

export default HomePage