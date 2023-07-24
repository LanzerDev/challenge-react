import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

export function CustomAlert  ({ open, onClose, severity, message }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

