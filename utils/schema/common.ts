import { JsonLdData, FAQ, BreadcrumbItem, Location } from '@/types/seo';

export const generateWebsiteSchema = (): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rusden',
    description: 'Платформа объявлений для русскоязычных в Турции',
    url: 'https://rusden.com',
    alternateName: 'Русден - объявления в Турции',
    inLanguage: 'ru',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://rusden.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rusden',
      url: 'https://rusden.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rusden.com/logo.png',
        width: 512,
        height: 512,
      },
    },
    sameAs: [
      'https://facebook.com/rusden',
      'https://instagram.com/rusden',
      'https://twitter.com/rusden',
    ],
  };
};

export const generateOrganizationSchema = (): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rusden',
    description: 'Платформа объявлений для русскоязычных в Турции',
    url: 'https://rusden.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://rusden.com/logo.png',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Russian', 'Turkish', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Turkey',
    },
    knowsAbout: [
      'Недвижимость в Турции',
      'Работа в Турции',
      'Эмиграция в Турцию',
      'Жизнь в Турции',
      'Русскоязычные в Турции',
    ],
  };
};

export const generateFAQSchema = (faqs: FAQ[]): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
};

export const generateLocalBusinessSchema = (location: Location): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rusden',
    description: 'Платформа объявлений для русскоязычных в Турции',
    url: 'https://rusden.com',
    telephone: '+90 555 555 55 55',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: location.city,
      addressRegion: location.region,
      streetAddress: 'Central Business District',
    },
    geo: location.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    } : undefined,
    openingHours: 'Mo-Fr 09:00-18:00',
    areaServed: {
      '@type': 'Place',
      name: `${location.city}, ${location.region}, Turkey`,
    },
    languagesSpoken: ['Russian', 'Turkish', 'English'],
  };
};

export const generateVideoSchema = (videoData: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  duration: string;
}): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData.name,
    description: videoData.description,
    thumbnailUrl: videoData.thumbnailUrl,
    uploadDate: videoData.uploadDate,
    contentUrl: videoData.contentUrl,
    duration: videoData.duration,
    publisher: {
      '@type': 'Organization',
      name: 'Rusden',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rusden.com/logo.png',
      },
    },
  };
};