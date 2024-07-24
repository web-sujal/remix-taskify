import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Taskify Home" },
    {
      name: "description",
      content: "Welcome to taskify, where actions meet expectations.",
    },
  ];
};

export default function Index() {
  return (
    <div className="font-sans flex flex-col items-start justify-center bg-emerald-50 p-10 h-screen gap-y-10">
      {/* header */}
      <div className="flex w-full flex-col gap-y-3 pt-5 items-center justify-center">
        <h1 className="text-6xl font-extrabold text-emerald-700">
          Welcome to Taskify...
        </h1>
        <p className="text-gray-500 text-xl tracking-widest">
          Where actions meet expectations!
        </p>
      </div>

      {/* tasks list */}
      <div className="w-full bg-emerald-100 rounded-md flex flex-col h-full items-center justify-start p-4">
        Lorem Ipsum
      </div>
    </div>
  );
}
