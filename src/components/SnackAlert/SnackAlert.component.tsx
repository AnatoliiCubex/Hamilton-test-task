import { Snackbar, Alert, AlertColor } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  message?: string;
  severity?: AlertColor;
};

export const SnackAlertComponent: React.FC<Props> = ({
  open,
  handleClose,
  message,
  severity,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert variant='filled' onClose={handleClose} severity={severity}>
        {message ? message : "Success"}
      </Alert>
    </Snackbar>
  );
};

SnackAlertComponent.displayName = "SnackAlert";
