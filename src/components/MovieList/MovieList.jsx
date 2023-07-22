import { useState } from 'react';
import './movieliststyle.css'
import { MovieCard } from '../MovieCard/MovieCard';

function MovieList ({listPeliculas}) {

    return (
      <div className="container">
        {listPeliculas.map((pelicula, index) => (
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