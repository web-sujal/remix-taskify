// not used anywhere in code, but I'd appreciate a review

import { createContext, SetStateAction, useContext, useState } from "react";

import { TaskType } from "~/types";
import { getCurrentDate } from "~/utils";

interface TaskContextType {
  task: TaskType;
  setTask: React.Dispatch<SetStateAction<TaskType>>;
}

const INITIAL_STATE: TaskType = {
  id: Date.now(),
  title: "",
  description: "",
  dueDate: getCurrentDate(),
  createdAt: new Date().toISOString(),
  status: "pending",
};

export const TaskContext = createContext<TaskContextType>({
  task: INITIAL_STATE,
  setTask: () => {},
});

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [task, setTask] = useState<TaskType>(INITIAL_STATE);

  const values = {
    task,
    setTask,
  };

  return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};

export const useTask = () => useContext(TaskContext);
