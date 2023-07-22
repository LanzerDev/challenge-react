import { useState } from 'react';


function validarFormatoTexto(texto) {
    const regexHoras = /^\d+(,\d+)?\s*h$/i;
    const regexMinutos = /^\d+(,\d+)?\s*m$/i;
  
    if (regexHoras.test(texto)) {
      return "1";
    } else if (regexMinutos.test(texto)) {
      return "1";
    } else {
      return "0";
    }
  }

// Hook personalizado
function useFormatoTexto() {
  const [valido, setFormato] = useState("0");

  const validarTexto = (texto) => {
    const formatoValidado = validarFormatoTexto(texto);
    setFormato(formatoValidado);
  };

  return [
    valido,
    validarTexto,
  ];
}

export default useFormatoTexto;