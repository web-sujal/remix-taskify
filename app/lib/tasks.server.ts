import { createItem, readItem, readItems, updateItem } from "@directus/sdk";

import { TaskType } from "~/types";
import directus from "./directus";

export const mockTasks: TaskType[] = [
  {
    id: "1",
    title: "Complete React assignment",
    description: "Finish the React assignment for the interview process.",
    createdAt: "2024-07-21T10:00:00Z",
    dueDate: "2024-07-24T18:00:00Z",
    status: "pending",
  },
  {
    id: "2",
    title: "Buy groceries",
    description:
      "Purchase vegetables, fruits, and other essentials for the week.",
    createdAt: "2024-07-20T08:30:00Z",
    dueDate: "2024-07-21T17:00:00Z",
    status: "completed",
  },
  {
    id: "3",
    title: "Prepare presentation",
    description: "Create slides for the upcoming project meeting.",
    createdAt: "2024-07-19T14:15:00Z",
    dueDate: "2024-07-25T10:00:00Z",
    status: "pending",
  },
  {
    id: "4",
    title: "Attend yoga class",
    description: "Join the online yoga class to improve mental health.",
    createdAt: "2024-07-18T07:45:00Z",
    dueDate: "2024-07-18T09:00:00Z",
    status: "completed",
  },
  {
    id: "5",
    title: "Read technical articles",
    description: "Read articles about the latest trends in web development.",
    createdAt: "2024-07-17T11:30:00Z",
    dueDate: "2024-07-20T20:00:00Z",
    status: "pending",
  },
];

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
    // const tasks = await directus.request(
    //   readItems("Tasks", { sort: ["-createdAt"] })
    // );

    // return tasks as TaskType[];
    return mockTasks; // to be removed later when directus is active
  } catch (error) {
    console.log((error as Error).message);
    throw error;
  }
};

export const getTask = async (taskId: string): Promise<TaskType> => {
  try {
    // const task = await directus.request(readItem("Tasks", taskId));
    // return task;
    return mockTasks[0]; // to be removed later when directus is active
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
