import React, { useState } from 'react';
import axios from 'axiosConfig';
import { Box, Snackbar, Alert, Button, Typography, Modal, Switch, FormControlLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import styles from '../TaskItem/TaskItem.module.css'

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({ title: '', description: '' });
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnack = () => setOpenSnack(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tasks`,
        { title, description, completed },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTasks((prevTasks) => [...prevTasks, res.data]);
      setTitle('');
      setDescription('');
      setMessage("Tarefa adicionada com sucesso!");
      setSeverity("success")
      setOpenSnack(true);
      setOpen(false)
      
    } catch (error) {
      setMessage("Erro ao adicionar tarefa!");
      setSeverity("error")
      setOpenSnack(true);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '1px solid rgb(218, 226, 237)',
    borderRadius: '8px',
    boxShadow: '1px solid rgb(218, 226, 237)',
    p: 4,
  };

  return (
    <>
      <Button onClick={handleOpen} color="success" fullWidth variant="outlined" >Nova Tarefa</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={3}>
            Criar Tarefa
          </Typography>
          <Grid container
            justifyContent="flex-end" spacing={2}>
            <Grid size={12} >
              <TextField
                fullWidth
                id="title"
                label="Título"
                size="small"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid size={12} >
              <TextField
                fullWidth
                id="description"
                label="Descrição"
                size="small"
                variant="outlined"
                multiline
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid
              justifyContent="flex-end" size={{md:3}} offset={{md: 3}} sx={{ display: 'grid' }}>
              <FormControlLabel
                control={
                  <Switch
                    color="success"
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                }
                label="Tarefa Concluída"
              />
            </Grid>
            <Grid justifyContent="flex-end" size={{md:5}} display="flex" alignItems="center">
              <Button variant="contained" type="submit" onClick={handleSubmit}>Salvar</Button>
              <Button variant="contained" sx={{ ml: 2 }} className={`${styles.btndelete}`} onClick={handleClose}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
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



export default TaskForm;
