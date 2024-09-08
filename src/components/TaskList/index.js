import React, { useState, useEffect } from 'react';
import axios from 'axiosConfig';
import TaskItem from 'components/TaskItem';
import { Typography, IconButton, Container, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TaskForm from 'components/TaskForm';
import SearchIcon from '@mui/icons-material/Search';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    handleTasks()
  }, [page]);

  const handleTasks = () => {
    const fetchTasks = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks?description=${description}&page=${page}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages)
    };
    fetchTasks();
  };
  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTasks();
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container justifyContent="start" spacing={2} marginBottom={2}>
          <Grid size={2} display="flex" alignItems="start" height={"33px"}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: "100%" }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleTasks} >
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                onKeyDown={handleKeyDown}
                placeholder="Pesquisar"
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                id="search"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Paper>
          </Grid>
          <Grid size={2} offset={8} display="flex" alignItems="start">
            <TaskForm setTasks={handleTasks} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="left">Título</TableCell>
                    <TableCell align="left">Descrição</TableCell>
                    <TableCell align="left">Duração da tarefa</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <TaskItem key={task.id} row={task} onTaskDeleted={handleTaskDeleted} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Nenhuma tarefa encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Stack spacing={2} justifyContent="flex-end" size={3} display="flex" alignItems="flex-end" marginTop={3}>
          <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handleChange} />
        </Stack>
      </Container>
    </div>
  );
}

export default TaskList;
