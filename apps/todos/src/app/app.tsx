import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, Grid, Modal } from '@material-ui/core';
import { Todo } from '@vecterform-challenge/data';
import { getTodos } from '@vectorform-challenge/services';
import {
  Todos,
  TodoForm,
  renderButton,
  renderModal
} from '@vecterform-challenge/ui';
const useStyles = makeStyles((theme) => ({
  modal: {
    padding: 20,
    display: 'flex',
    borderRadius: 15,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: '60%',
    boxShadow: theme.shadows[5]
  }
}));

const App = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const populateTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    populateTodos();
  }, []);

  const updateTodos = (data) => {
    setTodos([...todos, data]);
  };

  const handleClose = () => {
    setFormIsOpen(false);
  };

  const handleOpen = () => {
    setFormIsOpen(true);
  };

  const body = (
    <span className={classes.modal}>
      <Container disableGutters>
        <Card>
          <Grid container alignItems="center">
            <TodoForm
              updateTodos={updateTodos}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
          </Grid>
        </Card>
      </Container>
    </span>
  );
  return (
    <>
      {renderModal(handleClose, formIsOpen, body)}
      <h1>Todos</h1>
      {renderButton('Add Todo', handleOpen)}
      <Todos todos={todos} updateTodos={updateTodos} />
    </>
  );
};

export default App;
