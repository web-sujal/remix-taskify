import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import Header from "~/components/Header";
import TaskForm from "~/components/TaskForm";
import { editTask, getTask } from "~/lib/tasks.server";
import { ErrorsType } from "~/types";
import { validateInputs } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const taskId = params.taskId;
  invariant(taskId, "Missing taskId param");

  const task = await getTask(taskId);
  return json(task);
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const taskId = params.taskId;

  invariant(taskId, "Missing taskId param");

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const errors: ErrorsType = validateInputs(title, description, dueDate);

  if (Object.keys(errors).length) {
    return json(errors);
  }

  const updatedTask = {
    title,
    description,
    dueDate,
  };

  await editTask(taskId, updatedTask);
  return redirect("/");
};

const Edit = () => {
  const task = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Edit Task" description="Let's define your actions..." />

      <TaskForm type="edit" errors={errors} task={task} />
    </main>
  );
};

export default Edit;
