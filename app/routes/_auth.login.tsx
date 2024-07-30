import {
  ActionFunctionArgs,
  createCookie,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import axios from "axios";

import AuthForm from "~/components/AuthForm";
import { AuthErrors } from "~/types";
import { validateEmailAndPass } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const errors: AuthErrors = validateEmailAndPass(email, password);

  if (Object.keys(errors).length > 0) {
    return json(errors);
  }

  try {
    const res = await axios.post(`${process.env.DIRECTUS_URL}/auth/login`, {
      email,
      password,
    });

    if (!res.data) {
      errors.invalidCredentials = "Invalid email or password";
      return json(errors);
    }

    const { access_token, refresh_token } = res.data.data;

    // Fetch user details
    const user = await axios.get(`${process.env.DIRECTUS_URL}/users/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!user.data) {
      errors.invalidCredentials = "Failed to fetch user details";
      return json(errors);
    }

    // console.log("user id: ", user.data.data);
    const userId = user.data.data.id;

    // Create cookies
    const accessTokenCookie = createCookie("access_token", {
      httpOnly: true,
      secure: false, // TODO: change later when in production
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    const refreshTokenCookie = createCookie("refresh_token", {
      httpOnly: true,
      secure: false, // TODO: change later when in production
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: "/",
    });

    const userIdCookie = createCookie("user_id", {
      httpOnly: true,
      secure: false, // TODO: change later when in production
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Set cookies in headers
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      await accessTokenCookie.serialize(access_token)
    );
    headers.append(
      "Set-Cookie",
      await refreshTokenCookie.serialize(refresh_token)
    );
    headers.append("Set-Cookie", await userIdCookie.serialize(userId));

    return redirect("/", { headers });
  } catch (error) {
    console.log("login failed");
    console.log((error as Error).message);
    return json({ invalidCredentials: "Invalid credentials" } as AuthErrors);
  }
};

const Login = () => {
  const errors = useActionData<typeof action>();

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 w-full">
      <AuthForm type="login" />

      <div className="flex flex-col items-center justify-between gap-y-3">
        {errors?.email && (
          <em className="italic text-sm text-red-600">{errors.email}</em>
        )}
        {errors?.password && (
          <em className="italic text-sm text-red-600">{errors.password}</em>
        )}

        {errors?.invalidCredentials && (
          <em className="italic text-sm text-red-600">
            {errors.invalidCredentials}
          </em>
        )}
      </div>
    </div>
  );
};

export default Login;
