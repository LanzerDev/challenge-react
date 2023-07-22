import './MovieFormStyles.css'
import { useState, useRef, useEffect } from 'react';
import useFormatoTexto from '../../hooks/useFormatoTexto';


// eslint-disable-next-line react/prop-types
export function MovieForm({ funcAgregarPelicula }) {
  const [movieData, setMovieData] = useState({
    nombre: '',
    duracion: '',
    calificacion: '',
  });

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleBtnClick = () => {
    if (movieData.nombre && movieData.calificacion && movieData.duracion) {

      const res = validarTexto(movieData.duracion);
      if(res === "1"){
        funcAgregarPelicula(movieData);

        setMovieData({
          nombre: '',
          duracion: '',
          calificacion: '',
        });
      } else {
        alert("Por favor, especifique el tiempo en horas o minutos (por ejemplo, 2,5h o 150m)");
      }
    }
  }

  const validarTexto = (texto) =>{
    const regexHoras = /^\d+(,\d+)?\s*h$/i;
    const regexMinutos = /^\d+(,\d+)?\s*m$/i;
  
    if (regexHoras.test(texto)) {
      return "1";
    } else if (regexMinutos.test(texto)) {
      return "1";
    } else {
      return "0";
    }
  }


  const handleKeyDown = (event, nextInputRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  };

  return (
    <div className="movie-form">
      <div>
        <label htmlFor="nombre">Nombre Película:</label>
        <input
          ref={inputRef1}
          type="text"
          id="nombre"
          name="nombre"
          value={movieData.nombre}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, inputRef2)}
        />
      </div>
      <div>
        <label htmlFor="calificacion">Calificación:</label>
        <input
          ref={inputRef2}
          type="number"
          id="calificacion"
          name="calificacion"
          value={movieData.calificacion}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, inputRef3)}
          maxLength={3}
        />
      </div>
      <div>
        <label htmlFor="duracion">Duración:</label>
        <input
          ref={inputRef3}
          type="text"
          id="duracion"
          name="duracion"
          value={movieData.duracion}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, inputRef1)}
        />
      </div>
      <button onClick={handleBtnClick}>Agregar</button>
    </div>
  );
}
