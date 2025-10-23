"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to captable by default since navbar handles navigation
    router.push("/captable");
  }, [router]);

  return (
    <div className="w-full h-full bg-gradient-to-r from-slate-100 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome</h1>
        <p className="text-lg text-gray-600">Redirecting to Cap Table...</p>
      </div>
    </div>
  );
}
