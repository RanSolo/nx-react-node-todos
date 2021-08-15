import { getAddTodoButton, getTodos } from '../support/app.po';

describe( 'TodoApps', () => {
  beforeEach( () => cy.visit( 'localhost:4200' ) );

  it( 'should display todos', () => {
    getTodos().should( ( t ) => expect( t.length ).equal( 2 ) );
    getAddTodoButton().click();
    getTodos().should( ( t ) => expect( t.length ).equal( 3 ) );
  } );
} );
