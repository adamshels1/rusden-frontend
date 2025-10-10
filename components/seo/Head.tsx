import Head from 'next/head';
import { SEOData } from '@/types/seo';

interface HeadProps {
  seo: SEOData;
}

export const HeadComponent: React.FC<HeadProps> = ({ seo }) => {
  return (
    <Head>
      {/* Basic meta tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && (
        <meta name="keywords" content={seo.keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      {seo.canonical && (
        <link rel="canonical" href={seo.canonical} />
      )}

      {/* Robots */}
      {seo.noindex && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      {/* Alternate languages */}
      {seo.alternateLanguages?.map((alt) => (
        <link
          key={alt.lang}
          rel="alternate"
          hrefLang={alt.lang}
          href={alt.url}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:title" content={seo.openGraph.title} />
      <meta property="og:description" content={seo.openGraph.description} />
      <meta property="og:url" content={seo.openGraph.url} />
      <meta property="og:type" content={seo.openGraph.type} />
      {seo.openGraph.image && (
        <>
          <meta property="og:image" content={seo.openGraph.image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      {seo.openGraph.siteName && (
        <meta property="og:site_name" content={seo.openGraph.siteName} />
      )}
      {seo.openGraph.locale && (
        <meta property="og:locale" content={seo.openGraph.locale} />
      )}

      {/* Twitter Card */}
      {seo.twitter && (
        <>
          <meta name="twitter:card" content={seo.twitter.card} />
          <meta name="twitter:title" content={seo.twitter.title} />
          <meta name="twitter:description" content={seo.twitter.description} />
          {seo.twitter.image && (
            <meta name="twitter:image" content={seo.twitter.image} />
          )}
        </>
      )}

      {/* Additional meta tags */}
      <meta name="author" content="Rusden" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Russian" />
      <meta name="geo.country" content="TR" />
      <meta name="geo.placename" content="Turkey" />

      {/* JSON-LD structured data */}
      {seo.jsonLd?.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      ))}

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Head>
  );
};