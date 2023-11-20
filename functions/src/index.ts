/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import {fetchAllTodos, fetchSingleTodoById} from './getTodos'
import {createTodos, onTodoCreate} from './createTodo'
import { onTodoUpdate, updateStatus } from "./updateTodo";
import * as admin from 'firebase-admin'
import { deleteTodoById, onTodoDelete } from './deleteTodo';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp()

// http triggers
export const getAllTodos = fetchAllTodos;
export const fetchSingleTodo = fetchSingleTodoById;
export const createTodo = createTodos;
export const markAsDone = updateStatus;
export const deleteTodo = deleteTodoById;

// background triggers
export const onTodoCreatelistener = onTodoCreate;
export const onTodoUpdatelistener = onTodoUpdate;
export const onTodoDeleteListener = onTodoDelete;
