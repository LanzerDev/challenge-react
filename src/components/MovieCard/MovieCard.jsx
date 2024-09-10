import './MovieCardStyle.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia, Skeleton, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

export function MovieCard({ nombre, calificacion, duracion, id, eliminarPelicula }) {
  const [image, setImage] = useState("")
  const api = import.meta.env.VITE_GOOGLE_API_MIDDLEWARE;

  const buscarImagen = (imagen) => {
    fetch(`${api}search?movie_name=${imagen}`)
      .then((response) => response.json())
      .then((data) => {
        setImage(data.original)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    buscarImagen(nombre)
  }, []);

  const convertirDuracion = (duracionProp) => {
    if (duracionProp.includes('m')) {
      const numeroMinutos = parseFloat(duracionProp);
      if (!isNaN(numeroMinutos)) {
        const horasDecimal = numeroMinutos / 60;
        return `${horasDecimal.toFixed(1)}h`;
      }
    } else if (duracionProp.includes('h')) {
      return duracionProp;
    }
    return duracionProp;
  };

  const duracionEnHoras = convertirDuracion(duracion)

  const handleDeleteButton = () => {
    eliminarPelicula(id)
  }

  return (
    <Card sx={{ minWidth: 355, position: 'relative' }}>
      <IconButton
        aria-label="delete"
        onClick={handleDeleteButton}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
          zIndex: 1
        }}
      >
        <DeleteIcon />
      </IconButton>
      {
        image ? (
          <CardMedia
            sx={{ height: 400 }}
            title={nombre}
            style={{ backgroundColor: "gray" }}
            image={image}
          />
        ) : (
          <Skeleton
            animation="wave"
            variant="rectangular"
            minWidth={355}
            height={400} />
        )
      }
      <CardContent>
        <Typography variant="h5" component="div">
          {nombre}
        </Typography>
        <br />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Calificacion: <strong>{calificacion}</strong>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Duración: <strong>{duracionEnHoras}</strong>
        </Typography>
      </CardContent>
    </Card>
  )
}