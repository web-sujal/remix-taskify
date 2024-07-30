import { ErrorsType, TaskType, Filter, AuthErrors } from "./types";
import { createCookie } from "@remix-run/node";

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

  if (title && title.trim() && title.length < 4) {
    errors.title = "Title should be at least 4 characters";
  }

  if (description && description.trim() && description.length < 12) {
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

export const filterTasks = (data: TaskType[], filterType: Filter) => {
  switch (filterType) {
    case "all":
      return data;
    case "completed":
      return data.filter((item) => item.status === "completed");
    case "pending":
      return data.filter((item) => item.status === "pending");
    case "dueDate":
      return data.sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
    default:
      return [];
  }
};

export const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateEmailAndPass = (email: string, password: string) => {
  const errors: AuthErrors = {};

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email";
  }

  if (password && password.trim() && password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return {};
};

// Get the user ID from the request cookies
export const getUserIdFromRequest = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const userCookie = await createCookie("user_id").parse(cookieHeader);
  return userCookie || null;
};

// Get the access token from the request cookies
export const getAccessTokenFromRequest = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const userCookie = await createCookie("access_token").parse(cookieHeader);
  return userCookie || null;
};
