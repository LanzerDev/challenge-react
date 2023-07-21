import './MovieCardStyle.css'

// eslint-disable-next-line react/prop-types
export function MovieCard({nombre, calificacion, duracion}){

    return(
        <div className="movie-card">
            <label>{nombre}</label>
            <div className="datos-pelicula">
                <label htmlFor="">calificacion:</label>
                <p>{calificacion}</p>
                <label htmlFor="">duracion:</label>
                <p>{duracion}</p>
            </div>
        </div>
    )
}