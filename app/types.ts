export interface TaskType {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  dueDate: string;
  status: "pending" | "completed";
  userId?: string;
}

export interface ErrorsType {
  title?: string;
  description?: string;
  dueDate?: string;
}

export type Filter = "all" | "completed" | "pending" | "dueDate";

export interface AuthErrors {
  email?: string;
  password?: string;
  invalidCredentials?: string;
}
