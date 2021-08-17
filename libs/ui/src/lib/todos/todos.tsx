import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Todo } from '@vecterform-challenge/data';
import { updateTodo } from '@vectorform-challenge/services';

const columns = [
  { field: 'task', headerName: 'Task', width: 190 },
  {
    field: 'description',
    headerName: 'Description',
    width: 190
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 190,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueGetter: (params: any) => params.value?.name
  },
  {
    field: 'completed',
    headerName: 'Completed?',
    type: 'boolean',
    width: 190,
    editable: true
  }
];

export const Todos = (props: { todos: Todo[]; updateTodos }) => {
  const updateTodoStatus = (params) => {
    updateTodo(params);
  };

  const [activeTodos, setActiveTodos] = useState<number>();

  useEffect(() => {
    const totalActiveTodos = () =>
      props.todos.filter((todo) => !todo.completed).length;

    setActiveTodos(totalActiveTodos);
  }, [activeTodos, props.todos]);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Active Tasks - {activeTodos}</h1>
      <DataGrid
        getRowId={(row) => row._id}
        rows={props.todos}
        components={{
          Toolbar: GridToolbar
        }}
        onCellEditCommit={updateTodoStatus}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default Todos;
