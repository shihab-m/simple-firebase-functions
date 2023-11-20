import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { DatabaseName } from "./enums";

export const fetchAllTodos = onRequest(async (req, res) => {
  try {
    const db = admin.database();
    const snapshot = await db.ref(DatabaseName.TODO_DB).once("value");
    const todos = snapshot.val();

    const responsetodos = todos
      ? Object.keys(todos).map((key) => ({
          id: key,
          ...todos[key],
        }))
      : [];

    res.status(200).send(responsetodos);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong", err: error });
  }
});

export const fetchSingleTodoById = onRequest(async (req, res) => {
  try {
    const db = admin.database();
    const todoId = req.query.id;
    const snapshot = await db.ref(`/${DatabaseName.TODO_DB}/${todoId}`).once("value");

    const todo = snapshot.val();
    console.log(">>.>>>>", todo);
    if (todo) {
      res.status(200).send({
        id: todoId,
        ...todo,
      });
    } else {
      res.status(404).send({
        message: "No task found with this id",
      });
    }
  } catch (error) {
    res.status(500).send("Faild to fetch the todo");
  }
});
