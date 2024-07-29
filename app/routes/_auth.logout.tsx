import { redirect } from "@remix-run/react";

import { directusAuthClient } from "~/lib/directus";

export const loader = async () => {
  return redirect("/login");
};

export const action = async () => {
  try {
    await directusAuthClient.logout();
    return redirect("/login");
  } catch (error) {
    console.error((error as Error).message);
    return redirect("/");
  }
};
