import * as express from 'express';
import { startDb } from './app/startup/db';
import addTodoRoutes = require( './app/startup/routes' );
const app = express();
startDb();
app.get( '/api', ( req, res ) => {
  res.send( { message: 'Welcome to api!' } );
} );
addTodoRoutes( app );

const port = process.env.port || 3333;
const server = app.listen( port, () => {
  console.log( `Listening at http://localhost:${port}/api` );
} );
server.on( 'error', console.error );