"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/component/Loader"; // Assuming you have a Loader component

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page immediately when a 404 is encountered
    router.replace("/");
  }, [router]);

  // Show a loader while redirecting
  return <Loader />;
}
