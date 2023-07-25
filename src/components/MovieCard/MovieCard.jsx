import './MovieCardStyle.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';

export function MovieCard({ nombre, calificacion, duracion }) {
  const [image, setImage] = useState("");

  const buscarImagen = (imagen) => {
    fetch(`http://localhost:3000/search?q=${imagen}`)
    .then((response) => response.json())
    .then((data) => {
      setImage(data)
    })
    .catch((error) => {
      console.error('Error al obtener los resultados:', error);
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

  return (
      <Card sx={{ minWidth: 355 }}>
        <CardMedia
          sx={{ height: 370 }}
          image={image}
          title={nombre}
        />
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