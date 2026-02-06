"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/component/Loader"; // Assuming you have a Loader component

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="text-4xl font-bold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-4 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="mt-8">
        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
