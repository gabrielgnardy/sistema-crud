import React, { useState } from 'react';
import axios from 'axiosConfig';
import Grid from '@mui/material/Grid2';
import { Box, Snackbar, Alert, Container, TextField, Button, Typography,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import Mascote from 'assets/mascote.png';
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('');
  const [emailReset, setEmailReset] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const {param} = useParams()

  const handleCloseSnack = () => setOpenSnack(false);
  
  const validate = () => {
    let tempErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      tempErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'E-mail inválido';
      isValid = false;
    }

    if (!password) {
      tempErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);

        navigate("/tasks");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const redirect = async (e) => {
    e.preventDefault();
    try {
      navigate("/register");
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = async (e) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset`, { email: emailReset,  });
    } catch (error) {
      
    }
    setOpenSnack(true)
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: { lg: '100%', md: '80%', sm: '80%' } }}>
            <Grid
              container
              spacing={0}
              alignItems="center"
              sx={{
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
              justifyContent="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid size={{ md: 12, lg: 6 }} sx={{ mb: { xs: 2, lg: 0 } }}>
                <Box sx={{
                  textAlign: 'center', padding: { xs: 1, lg: 0 }, height: {
                    xs: '16rem',
                    sm: '30rem',
                    md: '30rem',
                    lg: '40rem',
                  }
                }}>
                  <img
                    src={Mascote}
                    alt="Imagem do Mascote"
                    style={{ width: 'auto', height: '100%' }}
                  />
                </Box>
              </Grid>
              <Grid size={{ md: 12, lg: 6 }}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid size={10} offset={1}>
                      <Typography variant="h4" component="h1" gutterBottom>
                        Fazer login
                      </Typography>
                    </Grid>
                    <Grid size={10} offset={1}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid size={10} offset={1}>
                      <TextField
                        fullWidth
                        id="senha"
                        label="Digite sua senha"
                        variant="outlined"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid size={11} offset={1} display="flex" justifyContent="space-between" alignItems="center">
                      <button type='button' className={`${styles.btnremember}`} onClick={handleClickOpen}>
                        Esqueceu sua senha?
                      </button>
                    </Grid>
                    <Grid size={10} offset={1} display="flex" justifyContent="space-between" alignItems="center">
                      <Button variant="outlined" onClick={redirect}> Criar conta</Button>
                      <Button variant="contained" type="submit">Entrar</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleReset,
        }}
      >
        <DialogTitle>Esqueci a Senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Por favor, insira seu e-mail para receber um link de redefinição de senha. Verifique sua caixa de entrada e siga as instruções para criar uma nova senha.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            onChange={(e) => setEmailReset(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Voltar</Button>
          <Button onClick={handleReset}>Enviar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnack} autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleCloseSnack}>
        <Alert
          onClose={handleCloseSnack}
          severity={"success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          E-mail de recuperação enviado com sucesso
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
