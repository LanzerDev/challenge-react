import React, {useState} from "react"
import { MovieForm } from "./components/MovieForm/MovieForm"
import MovieList from "./components/MovieList/MovieList";
import './App.css'

function App() {
  const [listPeliculas, setListPeliculas] = useState([]);

  const agregarPelicula = (movieData) => {
    setListPeliculas([...listPeliculas, movieData]);
  }

  return (
    <>
      <MovieForm funcAgregarPelicula={agregarPelicula}></MovieForm>
      <MovieList listPeliculas={listPeliculas}></MovieList>
    </>
  )
}

export default App
