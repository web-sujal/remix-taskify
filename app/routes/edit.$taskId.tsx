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
import { editTask, getTask } from "~/lib/tasks.server";
import { ErrorsType } from "~/types";
import { formatDate, validateInputs } from "~/utils";

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

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Edit Task" description="Let's define your actions..." />

      <Form
        method="patch"
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
            min={4}
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
            minLength={12}
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
          disabled={isSubmitting}
          className="createAndUpdateTaskBtn"
        >
          {isSubmitting ? "Editing..." : "Edit Task"}
        </button>
      </Form>
    </main>
  );
};

export default Edit;
