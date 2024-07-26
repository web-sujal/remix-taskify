import { deleteItem } from "@directus/sdk";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import directus from "~/lib/directus";

export const action = async ({ params }: ActionFunctionArgs) => {
  const id = params.taskId;
  invariant(id, "Missing taskId in params");

  try {
    await directus.request(deleteItem("Tasks", id));
  } catch (error) {
    console.log((error as Error).message);
  }

  return redirect("/");
};
