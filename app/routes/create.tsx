import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import Header from "~/components/Header";
import { getCurrentDate, validateInputs } from "~/utils";
import { ErrorsType, TaskType } from "~/types";
import directus from "~/lib/directus";
import { createItem } from "@directus/sdk";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const title = String(formData.get("title"));
    const description = String(formData.get("description"));
    const dueDate = String(formData.get("dueDate"));

    // initializing newTask and errors
    const errors: ErrorsType = validateInputs(title, description, dueDate);
    let newTask: TaskType | object = {};

    if (Object.keys(errors).length > 0) {
      return json(errors);
    }

    // creating task
    newTask = {
      title,
      description,
      dueDate,
      status: "pending",
    };

    // saving task at directus
    const createdTask = await directus.request(createItem("Tasks", newTask));

    if (!createdTask) {
      throw new Error("Failed to create task");
    }

    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);

    return redirect("/");
  }
};

const Create = () => {
  const navigation = useNavigation();

  const errors = useActionData<typeof action>();

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
            defaultValue={getCurrentDate()}
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
          Create
        </button>
      </Form>
    </main>
  );
};

export default Create;
