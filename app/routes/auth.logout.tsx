import { redirect } from "@remix-run/react";

import { directusAuthClient } from "~/lib/directus";

export const action = async () => {
  console.log("inside logout: ");
  try {
    console.log("inside logout try block: ");

    const result = await directusAuthClient.logout();
    console.log("logout: ", result);

    return redirect("/auth/signup");
  } catch (error) {
    console.error((error as Error).message);
    return redirect("/");
  }
};
