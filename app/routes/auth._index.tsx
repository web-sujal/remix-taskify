import { Link } from "@remix-run/react";

const AuthRoot = () => {
  return (
    <div className="flex items-center justify-center gap-6 mt-15 w-full font-bold">
      <Link
        className="px-6 text-3xl text-emerald-600 hover:text-rose-600 hover:-translate-y-0.5 transition duration-150"
        to="/auth/login"
      >
        Login
      </Link>
      <Link
        className="px-6 text-3xl text-emerald-600 hover:text-rose-600 hover:-translate-y-0.5 transition duration-150"
        to="/login/signup"
      >
        Sign up
      </Link>
    </div>
  );
};

export default AuthRoot;
