import './MovieFormStyles.css'
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export function MovieForm ({funcAgregarPelicula}) {

  const [movieData, setMovieData] = useState({
    nombre: '',
    duracion: '',
    calificacion: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleBtnClick = () =>{
    if (movieData.nombre && movieData.calificacion && movieData.duracion) {

      if (!/^\d+(\.\d+)?$/.test(movieData.duracion)) {
        setError('Por favor, especifique el tiempo en horas o minutos (por ejemplo, 2,5 horas o 150 minutos).');
        setTimeout(() => setError(''), 5000); // Ocultar el mensaje de error después de 5 segundos
        return;
      }

      funcAgregarPelicula(movieData);
      setMovieData({
        nombre: '',
        duracion: '',
        calificacion: '',
      });
    }
  }


    
      return (
        <div className="movie-form">
      <div>
        <label htmlFor="nombre">Nombre Película:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={movieData.nombre}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="calificacion">Calificación:</label>
        <input
          type="number"
          id="calificacion"
          name="calificacion"
          value={movieData.calificacion}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="duracion">Duración:</label>
        <input
          type="text"
          id="duracion"
          name="duracion"
          value={movieData.duracion}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleBtnClick}>Agregar</button>
    </div>
      );
}
