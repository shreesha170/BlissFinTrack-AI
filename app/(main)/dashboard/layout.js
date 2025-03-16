import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import UserWelcome from "./_components/user-welcome";

export default function Layout() {
  return (
    <div className="px-5">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gradient-title">
          <UserWelcome />
        </h1>
      </div>
      
      <Suspense
        fallback={<BarLoader className="mt-6" width={"100%"} color="#9333ea" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
