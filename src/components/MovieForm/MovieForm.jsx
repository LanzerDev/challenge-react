import './MovieFormStyles.css'
import { useState, useRef } from 'react';
import { CustomAlert } from '../Alert/Alert';
import { Button, TextField } from '@mui/material';



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
    let { name, value } = e.target;

    //validacion para que la calificacion tenga rango del 1 al 100
    if (name === "calificacion") {
      value = parseInt(e.target.value, 10);
      if (value >= 1 && value <= 100) {
        setCalificacion(value);
      }
    }

    setMovieData({ ...movieData, [name]: value });
  };

  const handleBtnClick = () => {
    if (movieData.nombre && movieData.calificacion && movieData.duracion) {

      const valido = validarTexto(movieData.duracion);
      if (valido === "1") {
        funcAgregarPelicula(movieData);

        setMovieData({
          nombre: '',
          duracion: '',
          calificacion: '',
        });
        setCalificacion(0);
      } else {
        setOpen(true);
      }
    }
  }

  const validarTexto = (texto) => {
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

  const [open, setOpen] = useState(false);
  const [calificacion, setCalificacion] = useState(0);

  const handleAlertClose = () => {
    setOpen(false);
  }

  return (
    <div className="movie-form">
        <CustomAlert
          open={open}
          onClose={handleAlertClose}
          severity={"warning"}
          message={"Por favor, especifique el tiempo en horas o minutos (por ejemplo, 2,5h o 150m)"}
        ></CustomAlert>
        <TextField 
          fullWidth
          label="Nombre pelicula" 
          variant="standard"
          ref={inputRef1}
          type="text"
          id="nombre"
          name="nombre"
          value={movieData.nombre}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, inputRef2)}
        />
        <TextField 
          fullWidth
          label="Calificacion" 
          variant="standard" 
          ref={inputRef2}
          type="tel"
          min={1}
          max={100}
          maxLength={3}
          id="calificacion"
          name="calificacion"
          value={calificacion}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, inputRef3)}
        />
        <TextField 
          fullWidth
          label="Duracion" 
          variant="standard"
          ref={inputRef3}
          type="text"
          id="duracion"
          name="duracion"
          value={movieData.duracion}
          onChange={handleChange}
          onKeyDown={(event) => handleKeyDown(event, inputRef1)}
        />
      <Button
        variant="contained"
        onClick={handleBtnClick}>Agregar
      </Button>
    </div>
  );
}
