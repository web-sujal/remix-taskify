export interface TaskType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  status: "pending" | "completed";
}

export interface ErrorsType {
  title?: string;
  description?: string;
  dueDate?: string;
}
