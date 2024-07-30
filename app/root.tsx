import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="box">
        <Header
          title={error.status + " " + error.statusText}
          description={error.data}
        />
        <p className="w-full text-2xl text-gray-700 text-center">
          Back to{" "}
          <Link className="createAndUpdateTaskBtn" to="/">
            Safety
          </Link>
          .
        </p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="box">
        <Header title={error.name} description={error.message} />
        <p className="w-full text-2xl text-gray-700 text-center">
          Back to{" "}
          <Link className="createAndUpdateTaskBtn" to="/">
            Safety
          </Link>
          .
        </p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export default function App() {
  return <Outlet />;
}
