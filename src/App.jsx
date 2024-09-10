import { useState, useEffect } from "react"
import { MovieForm } from "./components/MovieForm/MovieForm"
import MovieList from "./components/MovieList/MovieList";
import './App.css'

function App() {
  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
  }

  const [listPeliculas, setListPeliculas] = useState(getLocalStorage("MOVIES") || [] );
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    // Encuentra el ID más alto en la lista actual de películas
    const maxId = listPeliculas.reduce((max, pelicula) => Math.max(max, pelicula.id), 0);
    setNextId(maxId + 1);
  }, []);

  const saveLocalStorage =(key, data)=> {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const eliminarPelicula = (id) => {
    const newList = listPeliculas.filter(pelicula => pelicula.id !== id);
    setListPeliculas(newList);
    saveLocalStorage("MOVIES", newList);
  }

  const agregarPelicula = (movieData) => {
    const newMovie = { ...movieData, id: nextId };
    const newList = [...listPeliculas, newMovie];
    setListPeliculas(newList);
    saveLocalStorage("MOVIES", newList);
    setNextId(nextId + 1);
  }

  return (
    <>
      <h1>Movie Rating</h1>
      <MovieForm funcAgregarPelicula={agregarPelicula}></MovieForm>
      <MovieList listPeliculas={listPeliculas} eliminarPelicula={eliminarPelicula}></MovieList>
    </>
  )
}

export default App
