import { createUser } from "@directus/sdk";
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
    await directus.request(
      createUser({ email, password, role: process.env.USER_ROLE_ID })
    );

    return redirect("/login");
  } catch (error) {
    console.log("signup failed");
    console.log((error as Error).message);
    return json({
      invalidCredentials: "Something went wrong. Please try again.",
    } as AuthErrors);
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
