import { MovieForm } from "./components/MovieForm/MovieForm"
import { MovieCard } from "./components/MovieCard/MovieCard"
import './App.css'

function App() {
 
  const agregar = (saludo) => {
    console.log(saludo)
  }


  return (
    <>
      <div className="container">
        <MovieForm funcAgregar={agregar}></MovieForm>
        <MovieCard nombre="Spiderman" duracion="120min" calificacion="10"></MovieCard>
      </div>
    </>
  )
}

export default App
