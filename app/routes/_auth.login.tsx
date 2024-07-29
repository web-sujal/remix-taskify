import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

import AuthForm from "~/components/AuthForm";
import { directusAuthClient } from "~/lib/directus";
import { AuthErrors } from "~/types";
import { validateEmailAndPass } from "~/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const errors: AuthErrors = validateEmailAndPass(email, password);

    if (Object.keys(errors).length > 0) {
      return json(errors);
    }

    const user = await directusAuthClient.login(email, password);

    if (!user) {
      errors.invalidCredentials = "Invalid user credentials";
      return json(errors);
    }

    console.log(errors);
    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);
    return redirect("/login");
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
