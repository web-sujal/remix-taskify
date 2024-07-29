import { Form, useNavigation } from "@remix-run/react";

import { ErrorsType, TaskType } from "~/types";
import { formatDate, getCurrentDate } from "~/utils";

interface TaskFormProps {
  type: "create" | "edit";
  errors?: ErrorsType;
  task?: TaskType;
}

const TaskForm = ({ type, errors, task }: TaskFormProps) => {
  // const errors = useActionData<ErrorsType>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const defaultValues = {
    id: task?.id || "",
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate || "",
    status: task?.status || "pending",
  };

  return (
    <Form
      method={type === "create" ? "post" : "patch"}
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
          defaultValue={defaultValues.title}
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
          defaultValue={defaultValues.description}
          className="input resize-none"
          placeholder="eg. buy fruits..."
          required
        />

        {/* error */}
        {errors?.description && (
          <em className="italic text-sm text-red-600">{errors.description}</em>
        )}
      </div>

      {/* Due Date */}
      <div className="flex w-full flex-col items-start justify-between gap-y-1">
        <label className="text-lg font-bold text-emerald-900" htmlFor="dueDate">
          Due Date:
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          defaultValue={formatDate(
            defaultValues.dueDate ? defaultValues.dueDate : getCurrentDate()
          )}
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
        {type === "edit"
          ? isSubmitting
            ? "Editing..."
            : "Edit Task"
          : isSubmitting
          ? "Creating..."
          : "Create Task"}
      </button>
    </Form>
  );
};

export default TaskForm;
