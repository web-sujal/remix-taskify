import { registerUser } from "@directus/sdk";
import { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useActionData } from "@remix-run/react";

import AuthForm from "~/components/AuthForm";
import directus from "~/lib/directus";
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
    await directus.request(registerUser(email, password));

    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);
    return redirect("/signup");
  }
};

const Signup = () => {
  const errors = useActionData<typeof action>();

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 w-full">
      <AuthForm type="signup" />

      <div className="flex flex-col items-center justify-between gap-y-3">
        {errors?.email && (
          <em className="italic text-sm text-red-600">{errors.email}</em>
        )}
        {errors?.password && (
          <em className="italic text-sm text-red-600">{errors.password}</em>
        )}
      </div>
    </div>
  );
};

export default Signup;
