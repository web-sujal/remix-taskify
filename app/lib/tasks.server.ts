import { createItem, readItems } from "@directus/sdk";

import { TaskType } from "~/types";
import directus from "./directus";

export const addTask = async (
  task: Pick<TaskType, "title" | "description" | "dueDate">
) => {
  try {
    return await directus.request(
      createItem("Tasks", {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: "pending",
      })
    );
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const tasks = await directus.request(
      readItems("Tasks", { sort: ["-createdAt"] })
    );

    return tasks as TaskType[];
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};
