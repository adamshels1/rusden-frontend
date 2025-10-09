"use client";

import { Suspense } from "react";
import { Navbar } from "./navbar";
import { Spinner } from "@heroui/spinner";

export function NavbarWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-4">
          <Spinner size="sm" />
        </div>
      }
    >
      <Navbar />
    </Suspense>
  );
}