import { createItem, readItems } from "@directus/sdk";

import { TaskType } from "~/types";
import directus from "./directus";

export const addTask = async (
  task: Pick<TaskType, "title" | "description"> & { dueDate: string }
) => {
  try {
    return await directus.request(
      createItem("Tasks", {
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate),
        status: "pending",
      })
    );
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    return await directus.request(readItems("Tasks", { sort: ["-createdAt"] }));
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};
