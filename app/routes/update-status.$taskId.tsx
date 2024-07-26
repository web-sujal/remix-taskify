import { updateItem } from "@directus/sdk";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import directus from "~/lib/directus";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const id = formData.get("taskId");
  const status = formData.get("status");

  invariant(id, "Missing taskId params");

  const updatedTask = {
    status,
  };

  try {
    const res = await directus.request(
      updateItem("Tasks", id as string, updatedTask)
    );

    if (!res) {
      throw new Error("Failed to update task status");
    }

    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);
    return redirect("/");
  }
};
