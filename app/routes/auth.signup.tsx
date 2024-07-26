import { registerUser } from "@directus/sdk";
import { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/react";

import AuthForm from "~/components/AuthForm";
import directus from "~/lib/directus";
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

    const user = await directus.request(registerUser(email, password));
    console.log("user: ", user);

    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);
    return redirect("/signup");
  }
};

const Signup = () => {
  return (
    <>
      <AuthForm type="signup" />
    </>
  );
};

export default Signup;
