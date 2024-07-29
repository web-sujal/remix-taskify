import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteTask } from "~/lib/tasks.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  const id = params.taskId;
  invariant(id, "Missing taskId in params");

  await deleteTask(id);

  return redirect("/");
};
