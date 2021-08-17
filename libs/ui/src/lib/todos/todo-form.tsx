import React, { useEffect, useState } from 'react';
import {
  renderHelperText,
  renderSubmitButton,
  renderTextField,
  handleChange,
  joinErrMsgs
} from '../../';
import { addTodo, getCategories } from '@vectorform-challenge/services';
import { renderButton, renderSelect } from '../render-functions';
import Joi from 'joi';
import { useValidator } from 'react-joi';
import { Button, Container, FormControl, Grid } from '@material-ui/core';
/* eslint-disable-next-line */

const initialForm = {
  task: '',
  description: '',
  category: { _id: '' },
  completed: false
};
export function TodoForm(props) {
  const [categories, setCategories] = useState([]);
  const { state, setData, validate } = useValidator({
    initialData: initialForm,
    schema: Joi.object({
      task: Joi.string().required(),
      description: Joi.string().required(),
      completed: Joi.boolean(),
      category: Joi.string()
    })
  });

  const {
    $errors,
    $invalid,
    $data,
    $data: { task, description, category, completed }
  } = state;

  const handleSelect = async (e) => {
    setData({ ...$data, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cloneData = { ...$data };
    if ($invalid) return;

    props.handleClose();

    setData({ ...($errors || {}) });

    try {
      const { data } = await addTodo(cloneData);
      props.updateTodos(data);
      alert('success');
    } catch (error) {
      console.log(error.response.details);
      alert(error.response);
    }
  };

  useEffect(() => {
    const populateCategories = async () => {
      const { data: categories } = await getCategories();
      console.log(categories);
      setCategories(categories);
    };
    populateCategories();
  }, []);

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <h1>Add Todo</h1>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              {renderTextField(
                'Task',
                $data.task,
                handleChange(setData),
                'task'
              )}
              {$errors.task?.length > 0 &&
                renderHelperText(joinErrMsgs($errors.task))}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              {renderTextField(
                'Description',
                $data.description,
                handleChange(setData),
                'description'
              )}
              {$errors.description?.length > 0 &&
                renderHelperText(joinErrMsgs($errors.description))}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              {categories &&
                renderSelect(
                  'Category',
                  'category',
                  handleSelect,
                  categories,
                  category._id
                )}
              {$errors.category.length > 0 &&
                renderHelperText(joinErrMsgs($errors.category))}
            </FormControl>
          </Grid>
          {renderSubmitButton('Submit', validate)}
        </form>
      </Grid>
    </Grid>
  );
}

export default TodoForm;
