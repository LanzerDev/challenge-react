import './MovieCardStyle.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  CardMedia,
  Skeleton,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

export function MovieCard({ nombre, calificacion, duracion, id, eliminarPelicula }) {
  const [image, setImage] = useState("")
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    eliminarPelicula(id)
    setOpen(false)
  }

  const handleDisagree = () => {
    setOpen(false)
  }

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


  return (
    <Tooltip title="Ver detalles">
      <Card sx={{ minWidth: 355, position: 'relative', cursor: 'pointer' }}>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={handleClickOpen}
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
        </Tooltip>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Desea eliminar esta pelicula?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Si elmina esta pelicula es probable que al volverla a agregar la api de busqueda de google traiga una imagen diferente (Aunque sea la misma pelicula)"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree}>Disagree</Button>
            <Button onClick={handleAgree} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
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
    </Tooltip>
  )
}