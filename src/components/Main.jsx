import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

import backgroundImage from "./bg.jpg";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10vh",
    background: "white",
    padding: "50px",
    borderRadius: "10px",
  },
  textField: {
    marginBottom: "16px",
  },
  snackbar: {
    backgroundColor: "warning",
    color: "black",
    fontWeight: "bold",
  },
}));

const Main = () => {
  const classes = useStyles();
  const [quote, setQuote] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpen = () => {
    if (
      inputValue === "yes" ||
      inputValue === "Yes" ||
      inputValue === "YES" ||
      inputValue === "YeS" ||
      inputValue === "yEs" ||
      inputValue === "YeSs" ||
      inputValue === "YeSss"
    ) {
      setQuote(
        <b>
          <i>
          Don't let the feeling of happiness fade away; keep it going.
          </i>
        </b>
      );
    } else if (
      inputValue === "no" ||
      inputValue === "No" ||
      inputValue === "NO" ||
      inputValue === "nO"
    ) {
      setQuote(
        <b>
          <i>
          Hello! I’m the happiness fairy. I’ve sprinkled happy dust on you. Now smile dammit, that shit’s expensive.
          </i>
        </b>
      );
    } else {
      setSnackbarMessage('Please enter "YES" or "NO"');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setOpen(true);
    setDialogTitle("Please wait...");

    setTimeout(() => {
      setLoading(false);
      setDialogTitle("");
    }, 5000);
  };

  const handleClose = () => {
    setOpen(false);
    setQuote("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (!loading) {
      setInputValue("");
    }
  }, [loading]);

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <TextField
          className={classes.textField}
          label="Are you OK!?"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ marginTop: "16px" }}
        >
          Click Here
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            quote
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
