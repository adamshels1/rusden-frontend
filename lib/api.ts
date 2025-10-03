import type { Listing, ListingsResponse, ListingFilters } from '@/types/listing';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getListings(filters?: ListingFilters): Promise<ListingsResponse> {
  const params = new URLSearchParams();

  if (filters?.category) params.append('category', filters.category);
  if (filters?.subcategory) params.append('subcategory', filters.subcategory);
  if (filters?.location) params.append('location', filters.location);
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters?.search) params.append('search', filters.search);
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());

  const url = `${API_URL}/listings${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch listings: ${response.statusText}`);
  }

  return response.json();
}

export async function getListing(id: string): Promise<Listing> {
  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch listing: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/listings/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data.map((item: { name: string }) => item.name);
}

export async function getCities(): Promise<string[]> {
  const response = await fetch(`${API_URL}/listings/cities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cities: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
}

export async function getSubcategories(category?: string): Promise<string[]> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);

  const response = await fetch(`${API_URL}/listings/subcategories${params.toString() ? `?${params.toString()}` : ''}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
}
