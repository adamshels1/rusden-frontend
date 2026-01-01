import type { Listing } from "@/types/listing";
import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { getListing } from "@/lib/api";
import { ListingDetailClient } from "./listing-detail-client";

const categoryLabels: Record<string, string> = {
  realty: "Недвижимость",
  job: "Работа",
  service: "Услуги",
  goods: "Товары",
  auto: "Авто",
  event: "Мероприятия",
};

const subcategoryLabels: Record<string, string> = {
  rent: "Аренда",
  rent_long: "Аренда",
  rent_short: "Краткосрочная аренда",
  sale: "Продажа",
  Аренда: "Аренда",
  Продажа: "Продажа",
  "Краткосрочная аренда": "Краткосрочная аренда",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const listing = await getListing(id);

    if (!listing) {
      return {
        title: "Объявление не найдено - Rusden",
        description: "Объявление не найдено или было удалено",
      };
    }

    const categoryLabel =
      categoryLabels[listing.category] || listing.category;
    const subcategoryLabel = listing.subcategory
      ? subcategoryLabels[listing.subcategory] || listing.subcategory
      : "";

    const title = `${listing.title} - ${categoryLabel}${subcategoryLabel ? " - " + subcategoryLabel : ""} - Rusden`;
    const description =
      listing.description && listing.description.length > 160
        ? listing.description.substring(0, 157) + "..."
        : listing.description || `${categoryLabel}${subcategoryLabel ? " - " + subcategoryLabel : ""} в Турции`;

    const priceText =
      listing.price && listing.currency
        ? `${listing.price} ${listing.currency}`
        : "";
    const locationText = listing.location ? `, ${listing.location}` : "";
    const fullDescription = `${description}${priceText ? ". Цена: " + priceText : ""}${locationText}`;

    const imageUrl =
      listing.images && listing.images.length > 0
        ? listing.images[0]
        : "https://rusden.tr/og-image.jpg";

    return {
      title,
      description: fullDescription,
      keywords: [
        listing.title,
        categoryLabel,
        subcategoryLabel,
        listing.location || "",
        "объявления турция",
        "русские в турции",
        ...(listing.category === "realty"
          ? [
              "недвижимость турция",
              "купить квартиру турция",
              "аренда турция",
            ]
          : []),
      ].filter(Boolean),
      openGraph: {
        type: "website",
        title,
        description: fullDescription,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: listing.title,
          },
        ],
        locale: "ru_RU",
        siteName: "Rusden",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: fullDescription,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://rusden.tr/listing/${id}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: "Объявление - Rusden",
      description: "Просмотр объявления на Rusden - платформе объявлений для русскоязычных в Турции",
    };
  }
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let listing: Listing | null = null;
  const { id } = await params;

  try {
    listing = await getListing(id);
  } catch (error) {
    console.error("Error fetching listing:", error);
  }

  if (!listing) {
    notFound();
  }

  // Structured data for the listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type":
      listing.category === "realty"
        ? "RealEstateListing"
        : listing.category === "job"
          ? "JobPosting"
          : listing.category === "auto"
            ? "Vehicle"
            : "Product",
    name: listing.title,
    description: listing.description,
    ...(listing.price &&
      listing.currency && {
        offers: {
          "@type": "Offer",
          price: listing.price,
          priceCurrency: listing.currency,
          availability: "https://schema.org/InStock",
        },
      }),
    ...(listing.images &&
      listing.images.length > 0 && {
        image: listing.images,
      }),
    ...(listing.location && {
      address: {
        "@type": "PostalAddress",
        addressLocality: listing.location,
        addressCountry: "TR",
      },
    }),
    datePosted: listing.postedDate,
    ...(listing.category === "realty" && {
      "@type": "RealEstateListing",
      numberOfRooms: listing.title.match(/\d+\s*\+\s*\d+/)?.[0],
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.title.match(/(\d+)\s*м²/)?.[1],
        unitCode: "MTK",
      },
    }),
    ...(listing.category === "job" && {
      "@type": "JobPosting",
      hiringOrganization: {
        "@type": "Organization",
        name: "Работодатель",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: listing.location || "Турция",
          addressCountry: "TR",
        },
      },
    }),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
        type="application/ld+json"
      />
      <ListingDetailClient listing={listing} />
    </>
  );
}
