import { logout } from "@directus/sdk";
import {
  ActionFunctionArgs,
  createCookie,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { redirect } from "@remix-run/react";

import { directusAuthClient } from "~/lib/directus";
import { getUserIdFromRequest } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return redirect("/login");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookieHeader = request.headers.get("Cookie");

  // Parsing cookies
  const accessTokenCookie = createCookie("access_token");
  const refreshTokenCookie = createCookie("refresh_token");
  const userIdCookie = createCookie("user_id");

  const refreshToken = await refreshTokenCookie.parse(cookieHeader);

  if (refreshToken) {
    try {
      await directusAuthClient.request(logout(refreshToken));
    } catch (error) {
      console.error((error as Error).message);
      return redirect("/");
    }
  }

  // Clear cookies
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    await accessTokenCookie.serialize("", { expires: new Date(0) })
  );
  headers.append(
    "Set-Cookie",
    await refreshTokenCookie.serialize("", { expires: new Date(0) })
  );
  headers.append(
    "Set-Cookie",
    await userIdCookie.serialize("", { expires: new Date(0) })
  );

  // Redirect to login page
  return redirect("/login", { headers });
};
