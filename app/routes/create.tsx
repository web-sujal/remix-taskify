import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";

import Header from "~/components/Header";
import { addTask } from "~/lib/tasks.server";
import { ErrorsType } from "~/types";
import { getCurrentDate, validateInputs } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const dueDate = String(formData.get("dueDate"));

  const errors: ErrorsType = validateInputs(title, description, dueDate);

  if (Object.keys(errors).length > 0) {
    return json(errors);
  }

  await addTask({ title, description, dueDate });
  return redirect("/");
};

const Create = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const errors = useActionData<typeof action>();

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header title="Create Task" description="What's on your mind!!!" />

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
          disabled={isSubmitting}
          className="rounded-md bg-rose-700 text-white px-4 py-3 hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-90 transition drop-shadow-xl text-extrabold w-full"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </Form>
    </main>
  );
};

export default Create;
