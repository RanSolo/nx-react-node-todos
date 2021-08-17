import http from './http-service';

const endpoint = '/api/todos/';

export const getTodos = () => http.get(endpoint);
export const getTodo = (id) => http.get(`${endpoint}${id}/`);
export const addTodo = (data) => http.post(endpoint, data);
export const updateTodo = async ({ id, field, value }) => {
  let clonedTodo;
  let todo;
  try {
    const { data } = await getTodo(id);
    todo = data;
    clonedTodo = { ...todo };
  } catch (e) {
    console.log('e', e);
  }
  clonedTodo[field] = value;
  delete clonedTodo._id;
  delete clonedTodo.__v;
  console.log('clonedTodo', clonedTodo);
  clonedTodo.categoryId = clonedTodo.category?._id;
  console.log('clonedTodo', clonedTodo);
  http.put(`${endpoint}${id}`, clonedTodo);
};
