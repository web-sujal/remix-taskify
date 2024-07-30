import { createItem, deleteItem, readItem, updateItem } from "@directus/sdk";

import { TaskType } from "~/types";
import directus from "./directus";

export const addTask = async (
  task: Pick<TaskType, "title" | "description" | "dueDate" | "userId">
) => {
  try {
    return await directus.request(
      createItem("Tasks", {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: "pending",
        userId: task.userId,
      })
    );
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export const getTask = async (taskId: string): Promise<TaskType> => {
  try {
    const task = await directus.request(readItem("Tasks", taskId));
    return task;
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export const editTask = async (
  taskId: string,
  updatedTask: Partial<TaskType>
) => {
  try {
    await directus.request(updateItem("Tasks", taskId, updatedTask));
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    await directus.request(deleteItem("Tasks", id));
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};
