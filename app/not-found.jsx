import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-8xl font-extrabold text-red-500 drop-shadow-lg mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <Button className="px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
