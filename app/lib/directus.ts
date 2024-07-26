import { createDirectus, rest } from "@directus/sdk";
import { TaskType } from "~/types";

type User = {
  name: string;
  email?: string;
  image?: string;
};

type Schema = {
  Tasks: TaskType[];
  Users: User[];
};

const directus = createDirectus<Schema>(process.env.DIRECTUS_URL || "").with(
  rest()
);

export default directus;
