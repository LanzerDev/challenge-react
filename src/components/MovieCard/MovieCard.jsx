import './MovieCardStyle.css'

// eslint-disable-next-line react/prop-types
export function MovieCard({nombre, calificacion, duracion}){

    const convertirDuracion = (duracionProp) => {
        if (duracionProp.includes('m')) {
          const numeroMinutos = parseFloat(duracionProp);
          if (!isNaN(numeroMinutos)) {
            const horasDecimal = numeroMinutos / 60;
            return `${horasDecimal.toFixed(1)}h`;
          }
        } else if (duracionProp.includes('h')) {
          return duracionProp;
        }
        return duracionProp;
      };

    const duracionEnHoras = convertirDuracion(duracion)

    return(
        <div className="movie-card">
            <label>{nombre}</label>
            <div className="datos-pelicula">
                <div>
                    <label htmlFor="">calificacion:</label>
                    <p>{calificacion/100}</p>
                </div>
                <div>
                    <label htmlFor="">duracion:</label>
                    <p>{duracionEnHoras}</p>
                </div>
            </div>
        </div>
    )
}