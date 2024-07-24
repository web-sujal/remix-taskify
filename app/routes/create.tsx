import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useEffect } from "react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import Header from "~/components/Header";
import { getCurrentDate, validateInputs } from "~/utils";
import { ErrorsType, TaskType } from "~/types";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const errors: ErrorsType = validateInputs(title, description, dueDate);
  let newTask: TaskType | object = {};

  if (Object.keys(errors).length > 0) {
    return json({ errors, newTask });
  }

  newTask = {
    id: Date.now(),
    title,
    description,
    dueDate,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  return json({ errors, newTask });
};

const Create = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData && Object.keys(actionData.newTask).length) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(actionData.newTask);

      window.localStorage.setItem("tasks", JSON.stringify(tasks));
      navigate("/");
    }
  }, [actionData, navigate]);

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Create Task" description="What's on your mind!!!" />

      <Form
        method="post"
        className="flex flex-col bg-emerald-100 rounded-lg p-10 items-start justify-start gap-y-6 max-w-lg w-full"
        // onSubmit={handleSubmit}
      >
        {/* title */}
        <div className="flex w-full flex-col items-start justify-between gap-y-1">
          <label className="text-lg font-bold text-emerald-900" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="input"
            placeholder="eg. buy groceries"
            required
          />

          {/* error */}
          {actionData?.errors.title && (
            <em className="italic text-sm text-red-600">
              {actionData.errors.title}
            </em>
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
            id="description"
            name="description"
            rows={4}
            className="input resize-none"
            placeholder="eg. buy fruits..."
            required
          />

          {/* error */}
          {actionData?.errors?.description && (
            <em className="italic text-sm text-red-600">
              {actionData.errors.description}
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
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={getCurrentDate()}
            className="input"
            required
          />

          {/* error */}
          {actionData?.errors?.dueDate && (
            <em className="italic text-sm text-red-600">
              {actionData.errors.dueDate}
            </em>
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

// const handleSubmit = (event: React.FormEvent) => {
//   event.preventDefault();

//   const newErrors: ErrorsType = {};

//   if (task.title.length < 4) {
//     newErrors.title = "Title should be at least 4 characters";
//   }

//   if (task.description.length < 12) {
//     newErrors.description = "Description should be at least 12 characters";
//   }

//   if (isInvalidDueDate(task.dueDate)) {
//     newErrors.dueDate = "Due date cannot be a past date";
//   }

//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//     return;
//   }

//   setTask({ ...task, id: Date.now() });

//   // Save to local storage
//   const storedTasks = window.localStorage.getItem("tasks");
//   const tasks = storedTasks ? JSON.parse(storedTasks) : [];
//   tasks.push(task);
//   window.localStorage.setItem("tasks", JSON.stringify(tasks));

//   // Redirect to home page
//   setTask({ ...task, title: "", description: "" });

//   navigate("/");
// };
