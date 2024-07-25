import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

import Header from "~/components/Header";
import { ErrorsType, TaskType } from "~/types";
import {
  fetchTasksFromLocalStorage,
  saveTasksToLocalStorage,
  validateInputs,
} from "~/utils";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const taskId = params.taskId;
  invariant(taskId, "Missing taskId param");

  return json(taskId);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const taskId = params.taskId;
  invariant(taskId, "Missing taskId param");

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const errors: ErrorsType = validateInputs(title, description, dueDate);
  let newTask: TaskType | object = {};

  if (Object.keys(errors).length) {
    return json({ errors, newTask });
  }

  newTask = {
    id: Number(taskId),
    title,
    description,
    dueDate,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  return json({ errors, newTask });
};

const Edit = () => {
  const taskId = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [task, setTask] = useState<TaskType | null>(null);

  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    const storedTasks = fetchTasksFromLocalStorage();

    if (storedTasks && taskId) {
      const currTask = storedTasks.filter(
        (item: TaskType) => item.id === Number(taskId)
      );
      setTask(currTask[0]);
    }
  }, [taskId]);

  useEffect(() => {
    if (actionData?.newTask && Object.keys(actionData.newTask).length) {
      const storedTasks = fetchTasksFromLocalStorage();

      const updatedTasks = storedTasks.map((item: TaskType) =>
        item.id === (actionData.newTask as TaskType).id
          ? (actionData.newTask as TaskType)
          : item
      );

      // updating tasks on localStorage
      saveTasksToLocalStorage("tasks", updatedTasks);

      navigate("/");
    }
  }, [actionData, navigate]);

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Edit Task" description="Let's define your actions..." />

      <Form
        method="post"
        className="flex flex-col bg-emerald-100 rounded-lg p-10 items-start justify-start gap-y-6 max-w-lg w-full"
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
            defaultValue={task?.title}
            className="input"
            placeholder="eg. buy groceries"
            required
          />

          {/* error */}
          {actionData?.errors?.title && (
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
            defaultValue={task?.description}
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
            defaultValue={task?.dueDate}
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
          Edit
        </button>
      </Form>
    </main>
  );
};

export default Edit;
