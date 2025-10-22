import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://rusden.tr'),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  alternates: {
    canonical: 'https://rusden.tr',
    languages: {
      'ru': 'https://rusden.tr',
      'tr': 'https://rusden.tr/tr',
      'en': 'https://rusden.tr/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.openGraph.siteName,
    images: [
      {
        url: siteConfig.openGraph.image,
        width: siteConfig.openGraph.imageWidth,
        height: siteConfig.openGraph.imageHeight,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: siteConfig.twitter.cardType,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.openGraph.image],
    creator: siteConfig.twitter.handle,
    site: siteConfig.twitter.site,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head>
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="geo.country" content="TR" />
        <meta name="geo.placename" content="Turkey" />
        <meta name="ICBM" content="41.015137;28.979530" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="Russian" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* Structured data for the entire site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Organization',
                name: siteConfig.name,
                url: siteConfig.url,
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteConfig.url}/logo.png`,
                  width: 512,
                  height: 512,
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'Customer Service',
                  availableLanguage: ['Russian', 'Turkish', 'English'],
                },
                sameAs: Object.values(siteConfig.links).filter(link => link.startsWith('https://')),
              },
            }),
          }}
        />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <NavbarWrapper />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
