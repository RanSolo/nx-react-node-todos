import { render } from '@testing-library/react';

import Todos from './todos';
const todos = [
  {
    _id: 'abc',
    task: 'Do this',
    description: 'not that',
    categoryId: '1',
    completed: false
  }
];
describe('Todos', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Todos todos={todos} />);
    expect(baseElement).toBeTruthy();
  });
});
