import { Link } from "react-router-dom"

const HomePage = () => {
    return(
        <div>
            <Link to="/meadow">A capturar!</Link>
            <Link to="/profile">Ver perfil</Link>
        </div>
    )
}

export default HomePage