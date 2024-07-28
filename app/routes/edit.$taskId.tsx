import { readItem, updateItem } from "@directus/sdk";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import Header from "~/components/Header";
import directus from "~/lib/directus";
import { ErrorsType } from "~/types";
import { validateInputs, formatDate } from "~/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const taskId = params.taskId;
  invariant(taskId, "Missing taskId param");

  try {
    const fetchedTask = await directus.request(readItem("Tasks", taskId));

    if (!fetchedTask) {
      throw new Error("Failed to fetch task");
    }

    return json(fetchedTask);
  } catch (error) {
    console.log((error as Error).message);

    return redirect("/");
  }
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

  try {
    const res = await directus.request(
      updateItem("Tasks", taskId, updatedTask)
    );

    if (!res) {
      throw new Error("Failed to update task");
    }

    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);

    return redirect("/");
  }
};

const Edit = () => {
  const task = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const navigation = useNavigation();

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
            id="description"
            name="description"
            rows={4}
            defaultValue={task?.description}
            className="input resize-none"
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
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={formatDate(task?.dueDate)}
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
          Edit
        </button>
      </Form>
    </main>
  );
};

export default Edit;
