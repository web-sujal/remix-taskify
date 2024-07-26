import { ActionFunctionArgs } from "@remix-run/node";

import AuthForm from "~/components/AuthForm";
import { ErrorsType } from "~/types";

const Login = () => {
  return (
    <>
      <AuthForm type="login" />
    </>
  );
};

export default Login;
