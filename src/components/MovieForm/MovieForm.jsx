import './MovieFormStyles.css'
import { useState } from 'react';
import { CustomAlert } from '../Alert/Alert';
import { Button, TextField } from '@mui/material';



// eslint-disable-next-line react/prop-types
export function MovieForm({ funcAgregarPelicula }) {
<<<<<<< HEAD
  const [open, setOpen] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
=======
>>>>>>> 77c9835790a3d0c1500b16dcde28dd4f5b181075
  const [movieData, setMovieData] = useState({
    nombre: '',
    duracion: '',
    calificacion: '',
  });

<<<<<<< HEAD

=======
>>>>>>> 77c9835790a3d0c1500b16dcde28dd4f5b181075
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

      const valido = validarFormato(movieData.duracion);
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

  const validarFormato = (str) => {
    const regexHoras = /^\d+(,\d+)?\s*h$/i;
    const regexMinutos = /^\d+(,\d+)?\s*m$/i;

    if (regexHoras.test(str)) {
      return "1";
    } else if (regexMinutos.test(str)) {
      return "1";
    } else {
      return "0";
    }
  }

<<<<<<< HEAD
=======
  const [open, setOpen] = useState(false);
  const [calificacion, setCalificacion] = useState(0);

>>>>>>> 77c9835790a3d0c1500b16dcde28dd4f5b181075
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
          type="text"
          id="nombre"
          name="nombre"
          value={movieData.nombre}
          onChange={handleChange}
        />
        <TextField 
          fullWidth
          label="Calificación" 
          variant="standard" 
          type="tel"
          min={1}
          max={100}
          maxLength={3}
          id="calificacion"
          name="calificacion"
          value={calificacion}
          onChange={handleChange}
        />
        <TextField 
          fullWidth
          label="Duración" 
          variant="standard"
          type="text"
          id="duracion"
          name="duracion"
          value={movieData.duracion}
          onChange={handleChange}
        />
      <Button
        variant="contained"
        onClick={handleBtnClick}>Agregar
      </Button>
    </div>
  );
}
