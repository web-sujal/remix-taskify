export interface TaskType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  status: "pending" | "completed";
}
