import { ActionFunctionArgs, json, redirect } from "@remix-run/node";

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
    console.log("user: ", user);

    return redirect("/");
  } catch (error) {
    console.log((error as Error).message);
    return redirect("/login");
  }
};

const Login = () => {
  return (
    <>
      <AuthForm type="login" />
    </>
  );
};

export default Login;
