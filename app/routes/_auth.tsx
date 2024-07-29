import { Outlet } from "@remix-run/react";

import Header from "~/components/Header";

const AuthLayout = () => {
  return (
    <main className="box">
      <Header
        title="Welcome to Taskify"
        description="let's get you up and running..."
      />

      <Outlet />
    </main>
  );
};

export default AuthLayout;
