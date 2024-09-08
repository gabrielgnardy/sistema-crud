import React, { useState } from 'react';
import axios from 'axiosConfig';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import Mascote from 'assets/mascote.png';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '',name: '',surname: '', confirmPassword: '' });
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = { email: '', password: '', confirmPassword: '' };
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

    if (!name) {
      tempErrors.password = 'Nome é obrigatório';
      isValid = false;
    } 

    if (!surname) {
      tempErrors.password = 'Sobrenome é obrigatório';
      isValid = false;
    } 

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'As senhas não correspondem';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { email, password, name, surname });
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data.error === 'Validation error') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Este email já está em uso. Tente outro.',
        }));
      } else {
        console.error(err);
      }
    }
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
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
              <Box sx={{ textAlign: 'center', padding: { xs: 1, lg: 0 }, height: {
                xs: '16rem', 
                sm: '30rem', 
                md: '30rem', 
                lg: '40rem', 
              } }}>
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
                      Criar uma conta
                    </Typography>
                  </Grid>
                  <Grid size={10} offset={1}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Nome"
                      variant="outlined"
                      type="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid size={10} offset={1}>
                    <TextField
                      fullWidth
                      id="surname"
                      label="Sobrenome"
                      variant="outlined"
                      type="surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      error={!!errors.surname}
                      helperText={errors.surname}
                    />
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
                      id="password"
                      label="Digite sua senha"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                  </Grid>
                  <Grid size={10} offset={1}>
                    <TextField
                      fullWidth
                      id="confirmation"
                      label="Confirme sua senha"
                      variant="outlined"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    />
                  </Grid>
                  <Grid marginBottom={3} size={10} offset={1} display="flex" justifyContent="space-between" alignItems="center">
                    <Button variant="outlined" onClick={handleRedirect}> Voltar</Button>
                    <Button variant="contained" type="submit">Criar</Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default Register;
