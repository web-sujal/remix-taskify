import { Form, Link, useNavigation } from "@remix-run/react";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const navigation = useNavigation();

  return (
    <Form
      method="post"
      className="flex flex-col bg-emerald-100 rounded-lg p-10 items-start justify-start gap-y-6 max-w-lg w-full"
    >
      {/* email */}
      <div className="flex w-full flex-col items-start justify-between gap-y-1">
        <label className="text-lg font-bold text-emerald-900" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          placeholder="eg. name@example.com"
          required
        />

        {/* error */}
        {/* {errors?.title && (
        <em className="italic text-sm text-red-600">{errors.title}</em>
      )} */}
      </div>

      {/* password */}
      <div className="flex w-full flex-col items-start justify-between gap-y-1">
        <label
          className="text-lg font-bold text-emerald-900"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          placeholder="enter a strong password..."
          required
        />

        {/* error */}
        {/* {errors?.description && (
        <em className="italic text-sm text-red-600">
          {errors.description}
        </em>
      )} */}
      </div>

      {/* submit button */}
      <button
        type="submit"
        disabled={navigation.state === "submitting"}
        className="rounded-md bg-rose-700 text-white px-4 py-3 hover:bg-rose-800 disabled:cursor-not-allowed transition drop-shadow-xl text-extrabold w-full"
      >
        {type === "login" ? "Login" : "Sign up"}
      </button>

      {/* redirect */}
      <div className="flex items-center justify-center gap-x-6">
        {type === "login" ? (
          <p className="text-sm text-gray-600">
            {"Don't have an account? "}
            <Link
              className="cursor-pointer text-emerald-600 font-bold"
              to="/auth/signup"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="cursor-pointer text-emerald-600 font-bold"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </Form>
  );
};

export default AuthForm;
