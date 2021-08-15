import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TodosProps {}

const StyledTodos = styled.div`
  color: pink;
`;

export function Todos(props: TodosProps) {
  return (
    <StyledTodos>
      <h1>Welcome to Todos!</h1>
    </StyledTodos>
  );
}

export default Todos;
