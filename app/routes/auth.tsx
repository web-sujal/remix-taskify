import { Outlet } from "@remix-run/react";

import Header from "~/components/Header";

const AuthLayout = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-start bg-emerald-50 p-10 gap-y-10">
      <Header
        title="Welcome to Taskify"
        description="let's get you up and running..."
      />

      <Outlet />
    </main>
  );
};

export default AuthLayout;
