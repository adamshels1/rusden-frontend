"use client";

import { Suspense } from "react";
import HomePage from "./page";
import { Spinner } from "@heroui/spinner";

export default function PageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="lg" />
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}