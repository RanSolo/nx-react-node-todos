import express = require( 'express' );
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose = require( 'mongoose' );
const router = express.Router();
import { Todo, validate } from '../app/models/todo';
import { handle400, handle404, getCategory, getTodo } from './utils/utils';
const modelName = 'todo';

router.get( '/', async ( req, res ) => {
    const todos = await Todo.find().sort( 'name' );
    res.send( todos );
} );

router.get( '/:id/todos', async ( req, res ) => {
    const todos = await Todo.find().sort( 'name' );
    res.send( todos );
} );

router.get( '/:id', async ( req, res ) => {
    const todo = await getTodo( req.params.id, res );
    if ( todo ) res.send( todo );
} );

router.post( '/', async ( req, res ) => {
    const error = validate( req.body );

    if ( error ) handle400( error, res );
    try {
        console.log( 'req', req.body );
        const todo = await createTodo( req.body, res );

        await todo.save();
        res.send( todo );
    } catch ( error ) {
        console.error( error );
    }
} );

router.put( '/:id', async ( req, res ) => {
    const _id = req.params.id;
    const { task, categoryId, description, completed } = req.body;
    const error = validate( req.body );

    if ( error ) handle400( error, res );
    const category = await getCategory( categoryId, res );

    Todo.findOneAndUpdate(
        { _id },
        { task, category, description, completed },
        { new: true },
        function ( error, todo ) {
            if ( !todo ) handle404( modelName, req.params.id, res );
            if ( todo ) res.send( todo );
            if ( todo && error ) res.send( error );
        }
    );
} );

router.delete( '/:id', ( req, res ) => {
    Todo.findByIdAndRemove( req.params.id, function ( err, todo ) {
        if ( err ) console.error( 'ERROR: ', err );
        if ( !todo ) handle404( modelName, req.params.id, res );
        if ( todo ) res.send( todo );
    } );
} );

const createTodo = async ( reqBody, res ) => {
    try {
        const category = await getCategory( reqBody.categoryId, res );
        reqBody.gName = category.name;

        return await newTodo( reqBody );
    } catch ( e ) {
        console.error( 'error: ', e.message );
    }
};

const newTodo = ( reqBody ) => {
    const { task, categoryId, description, completed, gName } = reqBody;
    return new Todo( {
        task,
        category: { categoryId, name: gName },
        description,
        completed,
    } );
};

export default router;


//import { Express } from 'express';
//import { Todo } from '@vecterform-challenge/data';

//const todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

//export function addTodoRoutes( app: Express ) {
//    app.get( '/api/todos', ( req, resp ) => resp.send( todos ) );
//    app.post( '/api/addTodo', ( req, resp ) => {
//        const newTodo = {
//            title: `New todo ${Math.floor( Math.random() * 1000 )}`,
//        };
//        todos.push( newTodo );
//        resp.send( newTodo );
//    } );
//}