import { useState } from 'react';
import './movieliststyle.css'
import { MovieCard } from '../MovieCard/MovieCard';
import { CustomAlert } from '../Alert/Alert';
import { TextField } from '@mui/material';

function MovieList({ listPeliculas }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [searchInput, setSeaerchInput] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    if (filteredMovies.length == 0) {
      setOpen(true)
    }

    if (searchTerm.length >= 2) {
      setSeaerchInput(searchTerm)
    }
  };

  const filteredMovies = listPeliculas
    .filter((pelicula) =>
      pelicula.nombre.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => parseFloat(b.duracion) - parseFloat(a.duracion)); 


  const handleAlertClose = () => {
    setOpen(false);
  }

  return (
    <div className="container">
      <CustomAlert
        open={open}
        onClose={handleAlertClose}
        severity={"warning"}
        message={"No se encontraron resultados."}
      ></CustomAlert>
      <TextField
        label="Ingrese pelicula"
        variant="standard"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar película..."
      />

      {filteredMovies.map((pelicula, index) => (
        <MovieCard
          key={index}
          nombre={pelicula.nombre}
          duracion={pelicula.duracion}
          calificacion={pelicula.calificacion}
        />
      ))}
    </div>
  );
}

export default MovieList;