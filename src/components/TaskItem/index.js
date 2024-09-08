import React, { useState, useEffect } from 'react';
import axios from 'axiosConfig';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert, Box, Collapse, Chip, IconButton, Button, Switch, FormControlLabel, TableCell, TextField, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Grid from '@mui/material/Grid2';
import styles from './TaskItem.module.css'
import { format, formatDistance, parse } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function TaskItem({ row, onTaskDeleted }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(row.title);
  const [date, setDate] = useState(format(row.createdAt, "dd/MM/yyyy HH:mm", { locale: ptBR }));
  const [completedDate, setCompletedDate] = useState(row.completedDate == null ? "" : format(row.completedDate, "dd/MM/yyyy HH:mm", { locale: ptBR }));
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState(row.description);
  const [completed, setCompleted] = useState(row.completed);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({ title: '', description: '' });

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const handleCloseSnack = () => setOpenSnack(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenDelete = () => setOpenDelete(true);
  
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${row.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage("Tarefa excluida com sucesso!");
      setSeverity("success")
      setOpenSnack(true);
      onTaskDeleted(row.id);
    } catch (error) {
      setMessage("Erro ao excluir tarefa!");
      setSeverity("error")
      setOpenSnack(true);
    }
  };

  function GetDuration(){
    var response = formatDistance(new Date(), row.createdAt, { locale: ptBR });
    if (completedDate) {
      var completed = parse(completedDate, "dd/MM/yyyy HH:mm", new Date())
      response = formatDistance(completed, row.createdAt, { locale: ptBR });
    }
    setDuration(response)
  }

  useEffect(() => {
    GetDuration()

    const interval = setInterval(() => {
      GetDuration()
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit)
  };

  const handleToggleComplete = async () => {
    try {

      var res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tasks/${row.id}`,
        {
          completed: completed,
          title: title,
          description: description
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      const completedDateFromResponse = res.data.completedDate;
      row.completedDate = completedDateFromResponse;

      setCompletedDate(completedDateFromResponse == null ? "" : format(new Date(completedDateFromResponse), "dd/MM/yyyy HH:mm", { locale: ptBR }));
      setEdit(false)

      row.title = title
      row.description = description
      row.completed = completed

      setMessage("Tarefa editada com sucesso!");
      setSeverity("success")
      setOpenSnack(true);
    } catch (error) {
      setMessage("Erro ao editar tarefa!");
      setSeverity("error")
      setOpenSnack(true);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{duration}</TableCell>
        <TableCell align="center">
          {row.completed ? (
            <Chip label="Finalizado" color="success" />
          ) : (
            <Chip label="Em progresso" color="default" />
          )}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" marginBottom={3}>
                Detalhes
              </Typography>
              <Box>
                <Grid container
                  justifyContent="flex-end" spacing={2}>
                  {edit && (
                    <Grid size={12} >
                      <TextField
                        fullWidth
                        id="title"
                        label="Título"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={!!errors.title}
                        helperText={errors.title}
                      />
                    </Grid>)}
                  <Grid size={12} >
                    <TextField
                      fullWidth
                      id="description"
                      label="Descrição"
                      disabled={!edit}
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
                    justifyContent="flex-start" size={{md: 6}} sx={{ display: 'grid' }}>
                    <Typography color='textDisabled' variant="subtitle1" gutterBottom>
                      <span style={{ fontWeight: 'bold' }} >Criado em:</span> {date} {completedDate && (<>| <span style={{ fontWeight: 'bold' }}>Concluído em: </span> {completedDate} </>)}
                    </Typography>
                  </Grid>
                  <Grid
                    justifyContent="flex-end" size={{md: 3}} sx={{ display: 'grid' }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={completed}
                          disabled={!edit}
                          color="success"
                          onChange={(e) => setCompleted(e.target.checked)}
                        />
                      }
                      label="Tarefa Concluída"
                    />
                  </Grid>
                  <Grid justifyContent="flex-end" size={{md: 3}} display="flex" alignItems="center">

                    {edit && (
                      <Button variant="contained" type="submit" onClick={handleToggleComplete}>Salvar</Button>
                    )}
                    {!edit && (
                      <Button variant="contained" onClick={handleEdit}>Editar</Button>
                    )}
                    <Button variant="contained" sx={{ ml: 2 }} className={`${styles.btndelete}`}
                      onClick={handleOpenDelete}>Excluir</Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

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
      
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Excluir"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja realmente excluir este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Não</Button>
          <Button onClick={handleDelete} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskItem;
