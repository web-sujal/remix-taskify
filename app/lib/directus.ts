import { authentication, createDirectus, rest } from "@directus/sdk";
import { TaskType } from "~/types";

type Schema = {
  Tasks: TaskType[];
};

const directus = createDirectus<Schema>(process.env.DIRECTUS_URL || "").with(
  rest()
);
export const directusAuthClient = createDirectus(process.env.DIRECTUS_URL || "")
  .with(authentication("json"))
  .with(rest());

export default directus;
