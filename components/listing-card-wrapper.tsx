"use client";

import { Suspense } from "react";
import { ListingCard } from "./listing-card";
import type { Listing } from "@/types/listing";

interface ListingCardWrapperProps {
  listing: Listing;
  currentPage?: number;
}

export function ListingCardWrapper({ listing, currentPage }: ListingCardWrapperProps) {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-48" />}>
      <ListingCard listing={listing} currentPage={currentPage} />
    </Suspense>
  );
}