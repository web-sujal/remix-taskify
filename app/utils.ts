import { ErrorsType } from "./types";

export const isInvalidDueDate = (dueDate: string): boolean => {
  let currentDate = new Date().toISOString();
  currentDate = currentDate.slice(0, 10);

  return dueDate < currentDate;
};

export const getCurrentDate = (): string => {
  let currentDate = new Date().toISOString();
  currentDate = currentDate.slice(0, 10);

  return currentDate;
};

export const formatDate = (date: string) => {
  return date.slice(0, 10);
};

export const validateInputs = (
  title: string,
  description: string,
  dueDate: string
) => {
  const errors: ErrorsType = {};

  if (title.length < 4) {
    errors.title = "Title should be at least 4 characters";
  }

  if (description.length < 12) {
    errors.description = "Description should be at least 12 characters";
  }

  if (isInvalidDueDate(dueDate)) {
    errors.dueDate = "Due date cannot be a past date";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return {};
};
