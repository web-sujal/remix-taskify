import { useState } from "react";
import { TaskType } from "~/types";

const formatDate = (date: string) => {
  return date.slice(0, 10);
};

const Task = ({ task }: { task: TaskType }) => {
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");

  return (
    <div className="flex bg-white gap-x-6 justify-between rounded-md items-center px-7 py-2">
      {/* checkbox */}
      <input type="checkbox" name="status" id="status" checked={isCompleted} />

      {/* title, desc, due date, status */}
      <div className="flex max-w-md w-full flex-col items-start justify between gap-y-1">
        <p className={`text-lg font-bold ${isCompleted && "line-through"}`}>
          {task.title}
        </p>
        <p className="max-w-xs text-ellipsis text-sm text-gray-800">
          {task.description}
        </p>
        <p className="ml-auto max-w-xs text-ellipsis text-sm text-gray-500">
          Due: {formatDate(task.dueDate)}
        </p>
      </div>
    </div>
  );
};

export default Task;
