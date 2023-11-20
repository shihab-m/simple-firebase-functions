import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { DatabaseName } from "./enums";

export const deleteTodoById = onRequest(async(req, res) => {
    try {
        const todoId = req.query.id;

        const db = admin.database()
        const todoRef = db.ref(`/${DatabaseName.TODO_DB}/${todoId}`);
        await todoRef.remove()

        res.status(200).send({
            message : `Todo deleted successfully 👍 ID → ${todoId}` 
        })
    } catch (error) {
        res.status(500).send("Somthing went wrong")
    }
})


export const onTodoDelete = functions.database.ref(`/${DatabaseName.TODO_DB}/{id}`).onDelete((snapshot, context) => {
    try {
        console.log("Todo to delete: ", context.params.id)
        const todo = snapshot.val()
        console.log("Todo →→→→→", todo);
        return null
    } catch (error) {
        return error
    }
})