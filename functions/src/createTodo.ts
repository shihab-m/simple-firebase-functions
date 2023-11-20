import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { DatabaseName, TodoStatus } from "./enums";

export const createTodos = onRequest(async (req, res) => {
    try {
        const todo = {
            title: req.query.title,
            description: req.query.description,
            status: TodoStatus.TODO
        }
        const db = admin.database()
        const todoRef = db.ref(DatabaseName.TODO_DB).push();
        await todoRef.set(todo);

        const createdTodoSnapShot = await todoRef.once('value')

        res.status(200).send({
            id: todoRef.key,
            ...createdTodoSnapShot.val()
        })
    } catch (error) {
        res.status(500).send({ "message": "Something went wrong", "err": error })

    }
})

export const onTodoCreate = functions.database.ref(`/${DatabaseName.TODO_DB}/{id}`).onCreate((snapshot, context) => {
    try {
        const todoId = context.params.id;
        console.log("Todo id: ", todoId);
        const todo = snapshot.val();
        const newTitle = addTodoSign(todo.title);
        return snapshot.ref.update({ title: newTitle })
    } catch (error) {
        return error;
    }
})

function addTodoSign(title: string): string {
    return `📋 : ${title}`
}
