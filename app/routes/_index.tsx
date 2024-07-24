import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import Task from "~/components/Task";
import { TaskType } from "~/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Taskify Home" },
    {
      name: "description",
      content: "Welcome to taskify, where actions meet expectations.",
    },
  ];
};

const Tasks: TaskType[] = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Finish the React assignment for the interview process.",
    createdAt: "2024-07-21T10:00:00Z",
    dueDate: "2024-07-24T18:00:00Z",
    status: "pending",
  },
  {
    id: 2,
    title: "Buy groceries",
    description:
      "Purchase vegetables, fruits, and other essentials for the week.",
    createdAt: "2024-07-20T08:30:00Z",
    dueDate: "2024-07-21T17:00:00Z",
    status: "completed",
  },
];

export default function Index() {
  const [tasks, setTasks] = useState([1]);

  return (
    <div className="font-sans flex flex-col items-start justify-center bg-emerald-50 p-10 h-screen gap-y-10">
      {/* header */}
      <div className="flex w-full flex-col gap-y-3 pt-5 items-center justify-center">
        <h1 className="text-6xl font-extrabold text-emerald-700">
          Welcome to Taskify...
        </h1>
        <p className="text-gray-500 text-xl tracking-widest">
          Where actions meet expectations!
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/create"
        className="rounded-md bg-rose-700 text-white px-4 py-3 hover:bg-rose-800 hover:-translate-y-0.5 transition drop-shadow-xl text-extrabold mx-auto"
      >
        Create Task
      </Link>

      {/* tasks list */}
      <div className="w-full bg-emerald-100 rounded-md flex flex-col h-full items-center justify-start p-4">
        {tasks.length ? (
          <Task task={Tasks[1]} />
        ) : (
          <p className="text-emerald-800 text-2xl text-bold my-auto text-center text-opacity-60">
            Wow, such empty! <br />
            Try creating a task...
          </p>
        )}
      </div>
    </div>
  );
}
