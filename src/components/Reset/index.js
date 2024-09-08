import React, { useState, useEffect } from 'react';
import axios from 'axiosConfig';
import { Snackbar, Alert, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Login from 'components/Login';

function Reset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [open, setOpen] = useState(true);
  const [openSnack, setOpenSnack] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const handleCloseSnack = () => setOpenSnack(false);
  const location = useLocation();

  const validate = () => {
    let tempErrors = { email: '', password: '' };
    let isValid = true;

    if (!password) {
      tempErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      isValid = false;
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'As senhas não correspondem';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };
  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  const queryParams = getQueryParams(location.search);
  const token = queryParams.get('token');
  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = async (e) => {
    try {
      if (validate()) {
          await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/validate`, { token, newPassword: password});
        setMessage("Senha redefinida com sucesso")
        setSeverity("success")
        setOpenSnack(true)
        setOpen(false)
      }
    } catch (error) {

    }
  };

  return (
    <>
      <Login></Login>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleReset,
        }}
      >
        <DialogTitle>Redefinir senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, insira sua nova senha abaixo:
          </DialogContentText>

          <TextField
            fullWidth
            id="password"
            label="Digite sua nova senha"
            variant="outlined"
            type="password"
            size="small"
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            id="confirmation"
            label="Confirme sua nova senha"
            variant="outlined"
            margin="dense"
            size="small"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleReset}>Salvar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleCloseSnack}>
        <Alert
          onClose={handleCloseSnack}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
          </Alert>
      </Snackbar>
    </>
  );
}

export default Reset;
