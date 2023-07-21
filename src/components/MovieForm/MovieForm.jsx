import './MovieFormStyles.css'

// eslint-disable-next-line react/prop-types
export function MovieForm ({funcAgregar}) {
    
      return (
        <div className="movie-form">
          <div>
            <label htmlFor="movieName">Nombre Película:</label>
            <input
              type="text"
              id="movieName"
              name="movieName"
            />
          </div>
          <div>
            <label htmlFor="rating">Calificación:</label>
            <input
              type="number"
              id="rating"
              name="rating"
            />
          </div>
          <div>
            <label htmlFor="duration">Duración (min):</label>
            <input
              type="number"
              id="duration"
              name="duration"
            />
          </div>
          <button onClick={funcAgregar("hola")}>Agregar</button>
        </div>
      );
}
