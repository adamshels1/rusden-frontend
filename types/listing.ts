export interface ContactInfo {
  phone?: string | null;
  telegram?: string | null;
  other?: string | null;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number | null;
  currency: string | null;
  category: string;
  subcategory?: string | null;
  location: string | null;
  contactInfo: ContactInfo;
  images: string[] | null;
  postedDate: string;
  aiConfidence: number | null;
  createdAt: string;
}

export interface ListingsResponse {
  success: boolean;
  data: Listing[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface ListingFilters {
  category?: string;
  subcategory?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  limit?: number;
  offset?: number;
}
