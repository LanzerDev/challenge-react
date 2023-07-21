import React, {useState} from "react"
import { MovieForm } from "./components/MovieForm/MovieForm"
import { MovieCard } from "./components/MovieCard/MovieCard"
import './App.css'

function App() {
  const [listPeliculas, setListPeliculas] = useState([]);

  const agregarPelicula = (movieData) => {
    console.log(movieData)
    setListPeliculas([...listPeliculas, movieData]);
  }


  return (
    <>
      <MovieForm funcAgregarPelicula={agregarPelicula}></MovieForm>
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
    </>
  )
}

export default App
