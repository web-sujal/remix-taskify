import { Link } from "@remix-run/react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

import { TaskType } from "~/types";
import { formatDate } from "~/utils";

interface TaskProps {
  task: TaskType;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  handleDelete: (id: number) => void;
}

const Task = ({ task, handleDelete, setTasks }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");

  const handleCheckChange = () => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    setIsCompleted(newStatus === "completed");

    // fetching tasks form localStorage
    const storedTasks = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    );

    const updatedTasks = storedTasks.map((item: TaskType) =>
      item.id === task.id ? { ...item, status: newStatus } : item
    );

    setTasks(updatedTasks);

    // updating localStorage
    window.localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="group flex w-full max-w-md bg-white gap-x-6 justify-between rounded-md items-center px-7 py-2">
      {/* checkbox */}
      <input
        type="checkbox"
        name="status"
        id="status"
        onChange={handleCheckChange}
        checked={isCompleted}
      />

      {/* title, desc, due date, status */}
      <div className="flex max-w-md w-full flex-col items-start justify between gap-y-1">
        <div className="flex items-center justify-between w-full gap-x-2">
          <p className={`text-lg font-bold ${isCompleted && "line-through"}`}>
            {task.title}
          </p>

          <div className="hidden group-hover:flex items-center justify-between gap-x-2">
            <Link
              to={`edit/${task.id}`}
              className="hover:-translate-y-0.5 transition"
            >
              <CiEdit size={25} />
            </Link>
            <button
              className="hover:-translate-y-0.5 transition"
              onClick={() => handleDelete(task.id)}
            >
              <MdOutlineDelete size={25} className="text-red-500" />
            </button>
          </div>
        </div>
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
