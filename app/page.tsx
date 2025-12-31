"use client";

import { Suspense } from "react";
import HomePage from "./home-page";
import { Spinner } from "@heroui/spinner";

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-96">
          <Spinner size="lg" />
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}