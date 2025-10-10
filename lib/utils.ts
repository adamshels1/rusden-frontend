import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// SEO utility functions
export const generateSEOTitle = (title: string, siteName?: string): string => {
  const name = siteName || 'Rusden';
  return title === name ? title : `${title} - ${name}`;
};

export const generateSEODescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

export const generateKeywords = (text: string, additionalKeywords?: string[]): string[] => {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .slice(0, 10);

  const defaultKeywords = [
    'турция', 'недвижимость', 'русские', 'объявления', 'станбул', 'анталья',
    'эмиграция', 'жизнь в турции', 'работа', 'квартира', 'вилла'
  ];

  return Array.from(new Set([...defaultKeywords, ...words, ...(additionalKeywords || [])]))
    .slice(0, 15);
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

export const formatPrice = (price: number, currency: string = 'TRY'): string => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(price);
};

export const formatDate = (date: string | Date, locale: string = 'ru-RU'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

export const getRelativeTime = (date: string | Date, locale: string = 'ru-RU'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
};

export const sanitizeText = (text: string): string => {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

export const getReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  const sanitized = sanitizeText(content);
  return truncateText(sanitized, maxLength);
};