import { JsonLdData, RealEstateListing } from '@/types/seo';

export const generateRealEstateSchema = (listing: RealEstateListing): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `https://rusden.com/nedvizhimost/${listing.category}/${listing.subcategory}/${listing.city}/${listing.id}`,
    image: listing.images.map(img => img.url),
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: listing.currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Person',
        name: listing.seller.name,
        telephone: listing.seller.phone,
        email: listing.seller.email,
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: listing.city,
      addressRegion: listing.region,
      streetAddress: listing.address,
    },
    numberOfRooms: listing.bedrooms,
    numberOfBedrooms: listing.bedrooms,
    numberOfBathrooms: listing.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: listing.area,
      unitCode: 'MTK',
    },
    datePosted: listing.createdAt,
    dateModified: listing.updatedAt,
    category: listing.category,
    keywords: `${listing.category}, ${listing.subcategory}, ${listing.city}, ${listing.region}, Турция, недвижимость`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rusden.com/nedvizhimost/${listing.category}/${listing.subcategory}/${listing.city}/${listing.id}`,
    },
  };
};

export const generateRealEstateAggregateSchema = (listings: RealEstateListing[], location?: string): JsonLdData => {
  const avgPrice = listings.reduce((sum, listing) => sum + listing.price, 0) / listings.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    offerCount: listings.length,
    lowPrice: Math.min(...listings.map(l => l.price)),
    highPrice: Math.max(...listings.map(l => l.price)),
    priceCurrency: listings[0]?.currency || 'TRY',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Rusden',
      url: 'https://rusden.com',
    },
    areaServed: location ? {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressLocality: location,
      },
    } : {
      '@type': 'Country',
      name: 'Turkey',
    },
  };
};