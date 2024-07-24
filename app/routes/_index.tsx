import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

import Header from "~/components/Header";
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

export default function Index() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleDelete = (id: number) => {
    if (!confirm("Do you really want to delete this task?")) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storedTasks = window.localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <div className="font-sans flex flex-col items-start justify-center bg-emerald-50 p-10 h-screen gap-y-10">
      {/* header */}
      <Header
        title="Welcome to Taskify..."
        description="Where actions meet expectations!"
      />

      {/* CTA */}
      <Link
        to="/create"
        className="rounded-md bg-rose-700 text-white px-4 py-3 hover:bg-rose-800 hover:-translate-y-0.5 transition drop-shadow-xl text-extrabold mx-auto"
      >
        Create Task
      </Link>

      {/* tasks list */}
      <div className="w-full bg-emerald-100 rounded-md flex flex-col h-full items-center justify-start p-4 overflow-y-auto scrollbar gap-y-6">
        {tasks.length ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              setTasks={setTasks}
              handleDelete={handleDelete}
            />
          ))
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
