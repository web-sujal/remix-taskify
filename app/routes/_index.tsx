import { readItems } from "@directus/sdk";
import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import Header from "~/components/Header";
import Task from "~/components/Task";
import directus from "~/lib/directus";
import { TaskType, Filter } from "~/types";
import { filterTasks } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Taskify Home" },
    {
      name: "description",
      content: "Welcome to taskify, where actions meet expectations.",
    },
  ];
};

export const loader = async () => {
  try {
    const tasks = await directus.request(readItems("Tasks"));

    return json(tasks);
  } catch (error) {
    console.log((error as Error).message);
    return json([]);
  }
};

export default function Index() {
  const tasksFromDB = useLoaderData<typeof loader>();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const keys: (keyof Pick<TaskType, "title" | "description">)[] = [
    "title",
    "description",
  ];

  const search = (data: TaskType[]): TaskType[] => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filteredTasks = search(filterTasks(tasksFromDB, filter));

  return (
    <div className="font-sans flex flex-col items-start justify-center bg-emerald-50 p-10 h-screen gap-y-10">
      {/* header */}
      <Header
        title="Welcome to Taskify..."
        description="Where actions meet expectations!"
      />

      {/* CTA, search and filters */}
      <div className="flex justify-center w-full items-center space-x-10">
        {/* search */}
        <input
          type="text"
          className="input max-w-md"
          placeholder="search your tasks by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* CTA */}
        <Link
          to="/create"
          className="rounded-md text-nowrap bg-rose-700 text-white px-6 py-4 hover:bg-rose-800 hover:-translate-y-0.5 transition drop-shadow-xl text-extrabold mx-auto"
        >
          Create Task
        </Link>

        {/* filters */}
        <div className="flex gap-x-4 items-center justify-between">
          <button
            className="filterBtn text-nowrap"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="filterBtn text-nowrap"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className="filterBtn text-nowrap"
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className="filterBtn text-nowrap"
            onClick={() => setFilter("dueDate")}
          >
            Due Date
          </button>
        </div>
      </div>

      {/* tasks list */}
      <div className="w-full bg-emerald-100 rounded-md flex flex-col h-full items-center justify-start p-4 overflow-y-auto scrollbar gap-y-6">
        {filteredTasks.length ? (
          filteredTasks.map((task) => <Task key={task.id} task={task} />)
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
