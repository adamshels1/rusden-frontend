export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  alternateLanguages?: AlternateLanguage[];
  openGraph: OpenGraphData;
  twitter?: TwitterCardData;
  jsonLd?: JsonLdData[];
}

export interface AlternateLanguage {
  lang: string;
  url: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: 'website' | 'article' | 'product' | 'realestate';
  siteName?: string;
  locale?: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image?: string;
}

export interface JsonLdData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Real Estate types
export interface RealEstateListing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  subcategory: string;
  city: string;
  region: string;
  address: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: RealEstateImage[];
  seller: Seller;
  createdAt: string;
  updatedAt: string;
}

export interface RealEstateImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Seller {
  name: string;
  phone: string;
  email?: string;
}

// Job Posting types
export interface JobPosting {
  id: string;
  title: string;
  description: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN' | 'VOLUNTEER';
  experienceRequirements?: string;
  salary?: number;
  salaryPeriod?: string;
  currency?: string;
  benefits?: string[];
  requirements?: string;
  city: string;
  region: string;
  company: Company;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime?: number;
}

// FAQ types
export interface FAQ {
  question: string;
  answer: string;
}

// Location types
export interface Location {
  city: string;
  region: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Breadcrumb types
export interface BreadcrumbItem {
  name: string;
  url: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: string;
  icon?: string;
}