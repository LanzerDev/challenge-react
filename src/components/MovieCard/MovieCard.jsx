import './MovieCardStyle.css'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Box,
  Chip,
  Rating
} from '@mui/material';
import { AccessTime, Star } from '@mui/icons-material';
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
    <>
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
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
          },
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
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
        <Box
          sx={{
            height: 400,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {image ?
            <img
              src={image}
              alt={nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            /> : (<Skeleton
              animation="wave"
              alt={nombre}
              variant="rectangular"
              style={{
                width: '300px',
                height: '100%',
                objectFit: 'cover',
              }} />)}

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
            }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {nombre}
          </Typography>
        </Box>
        <CardContent sx={{ pt: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <AccessTime size={18} color="#757575" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {duracionEnHoras}
              </Typography>
            </Box>
            <Chip
              icon={<Star size={18} />}
              label={calificacion}
              color="primary"
              size="small"
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Rating
              name="movie-rating"
              value={parseFloat(calificacion) / 20}
              precision={0.5}
              readOnly
            />
          </Box>
        </CardContent>
      </Card>
    </>
  )
}