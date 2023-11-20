import { onRequest } from "firebase-functions/v2/https";
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { DatabaseName, TodoStatus } from "./enums";

export const updateStatus = onRequest(async (req, res) => {
    try {
        const todoId = req.query.id;
        const db = admin.database()
        const todoRef = await db.ref(`/${DatabaseName.TODO_DB}/${todoId}`);
        await todoRef.update({status: TodoStatus.DONE})
        res.status(200).send({
            "message": "Marked As Done 👍"
        })
    } catch (error) {
        res.status(500).send(error)
    }
})


export const onTodoUpdate = functions.database.ref(`/${DatabaseName.TODO_DB}/{id}`).onUpdate(async (change, context)=> {
    try {
        const todoAfterChange = change.after.val()
        const before = change.before.val();
        if (todoAfterChange.status == TodoStatus.DONE && before.status == TodoStatus.TODO){          
            const newTitle = addTickToTitle(todoAfterChange.title);
            return change.after.ref.update({ title: newTitle })
        }
    } catch (error) {
        return error;
    }
})

function addTickToTitle(title: string): string {
    return title.replace('📋', '✅');
}
