import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

import { TaskType } from "~/types";
import { formatDate } from "~/utils";

interface TaskProps {
  task: TaskType;
  handleDelete: (id: number) => void;
}

const Task = ({ task, handleDelete }: TaskProps) => {
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");

  const handleCheckChange = () => {};

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
            <button className="hover:-translate-y-0.5 transition">
              <CiEdit size={25} />
            </button>
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
