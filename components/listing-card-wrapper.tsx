"use client";

import { Suspense } from "react";
import { ListingCard } from "./listing-card";
import type { Listing } from "@/types/listing";

interface ListingCardWrapperProps {
  listing: Listing;
  currentPage?: number;
  onNavigate?: () => void;
}

export function ListingCardWrapper({ listing, currentPage, onNavigate }: ListingCardWrapperProps) {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-200 rounded-lg h-48" />}>
      <ListingCard listing={listing} currentPage={currentPage} onNavigate={onNavigate} />
    </Suspense>
  );
}