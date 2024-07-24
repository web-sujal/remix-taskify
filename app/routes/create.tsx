import {
  Form,
  // useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useState } from "react";
// import type { ActionFunctionArgs } from "@remix-run/node";
// import { json, redirect } from "@remix-run/node";

import Header from "~/components/Header";
import { isInvalidDueDate } from "~/utils";
import { useTask } from "~/context/TaskContext";

interface ErrorsType {
  title?: string;
  description?: string;
  dueDate?: string;
}

const Create = () => {
  const { task, setTask } = useTask();
  const [errors, setErrors] = useState<ErrorsType>({});

  const navigation = useNavigation();
  const navigate = useNavigate();

  // const actionData = useActionData<typeof action>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: ErrorsType = {};

    if (task.title.length < 4) {
      newErrors.title = "Title should be at least 4 characters";
    }

    if (task.description.length < 12) {
      newErrors.description = "Description should be at least 12 characters";
    }

    if (isInvalidDueDate(task.dueDate)) {
      newErrors.dueDate = "Due date cannot be a past date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to local storage
    const storedTasks = window.localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(task);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));

    // Redirect to home page
    navigate("/");
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Create Task" description="What's on your mind!!!" />

      <Form
        method="post"
        className="flex flex-col bg-emerald-100 rounded-lg p-10 items-start justify-start gap-y-6 max-w-lg w-full"
        onSubmit={handleSubmit}
      >
        {/* title */}
        <div className="flex w-full flex-col items-start justify-between gap-y-1">
          <label className="text-lg font-bold text-emerald-900" htmlFor="title">
            Title:
          </label>
          <input
            className="input"
            type="text"
            name="title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            id="title"
            placeholder="eg. buy groceries"
            required
          />

          {/* error */}
          {errors?.title && (
            <em className="italic text-sm text-red-600">{errors.title}</em>
          )}
        </div>

        {/* Description */}
        <div className="flex w-full flex-col items-start justify-between gap-y-1">
          <label
            className="text-lg font-bold text-emerald-900"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            rows={4}
            className="input resize-none"
            name="description"
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="eg. buy fruits..."
            required
          />

          {/* error */}
          {errors?.description && (
            <em className="italic text-sm text-red-600">
              {errors.description}
            </em>
          )}
        </div>

        {/* Due Date */}
        <div className="flex w-full flex-col items-start justify-between gap-y-1">
          <label
            className="text-lg font-bold text-emerald-900"
            htmlFor="dueDate"
          >
            Due Date:
          </label>
          <input
            type="date"
            value={task.dueDate}
            name="dueDate"
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            id="dueDate"
            className="input"
            required
          />

          {/* error */}
          {errors?.dueDate && (
            <em className="italic text-sm text-red-600">{errors.dueDate}</em>
          )}
        </div>

        {/* submit button */}
        <button
          type="submit"
          disabled={navigation.state === "submitting"}
          className="rounded-md bg-rose-700 text-white px-4 py-3 hover:bg-rose-800 disabled:cursor-not-allowed transition drop-shadow-xl text-extrabold w-full"
        >
          Create
        </button>
      </Form>
    </main>
  );
};

export default Create;

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();

//   const title = String(formData.get("title"));
//   const description = String(formData.get("description"));
//   const dueDate = String(formData.get("dueDate"));

//   const errors: ErrorsType = {};

//   if (title.length < 4) {
//     errors.title = "Title should be at least 4 characters";
//   }

//   if (description.length < 12) {
//     errors.description = "Description should be at least 12 characters";
//   }

//   if (isInvalidDueDate(dueDate)) {
//     errors.dueDate = "Due date cannot be a past date";
//   }

//   if (Object.keys(errors).length > 0) {
//     return json({ errors });
//   }

//   const newTask: TaskType = {
//     id: Date.now(),
//     title,
//     description,
//     dueDate,
//     createdAt: new Date().toISOString(),
//     status: "pending",
//   };

//   // Save the task to local storage
//   const storedTasks = window.localStorage.getItem("tasks");
//   const tasks = storedTasks ? JSON.parse(storedTasks) : [];
//   tasks.push(newTask);
//   window.localStorage.setItem("tasks", JSON.stringify(tasks));

//   // Redirect to home if validation is successful
//   return redirect("/");
// };
