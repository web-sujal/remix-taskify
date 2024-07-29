import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { editTask } from "~/lib/tasks.server";
import { TaskType } from "~/types";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const id = String(formData.get("taskId"));
  const status = String(formData.get("status")) as TaskType["status"];

  invariant(id, "Missing taskId params");

  await editTask(id, { status });
  return redirect("/");
};
