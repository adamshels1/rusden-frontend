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
  location: string | null;
  contact_info: ContactInfo;
  images: string[] | null;
  posted_date: string;
  ai_confidence: number | null;
  created_at: string;
}

export interface ListingsResponse {
  success: boolean;
  data: Listing[];
  meta: {
    limit: number;
    offset: number;
  };
}

export interface ListingFilters {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
