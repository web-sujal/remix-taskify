import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import Task from "~/components/Task";
import { mockTasks } from "~/mockData";

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
  const [tasks, setTasks] = useState(mockTasks);

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
      <div className="w-full bg-emerald-100 rounded-md flex flex-col h-full items-center justify-start p-4 overflow-y-auto gap-y-6">
        {tasks.length ? (
          tasks.map((task) => <Task task={task} key={task.id} />)
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
