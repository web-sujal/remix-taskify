import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";

import Header from "~/components/Header";
import TaskForm from "~/components/TaskForm";
import { addTask } from "~/lib/tasks.server";
import { ErrorsType } from "~/types";
import { getUserIdFromRequest, validateInputs } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = await getUserIdFromRequest(request);

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const errors: ErrorsType = validateInputs(title, description, dueDate);

  if (Object.keys(errors).length > 0) {
    return json(errors);
  }

  await addTask({ title, description, dueDate, userId });
  return redirect("/");
};

const Create = () => {
  const errors = useActionData<typeof action>();

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Create Task" description="What's on your mind!!!" />

      <TaskForm type="create" errors={errors} />
    </main>
  );
};

export default Create;
