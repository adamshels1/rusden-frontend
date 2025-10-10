import { writeFileSync } from 'fs';
import { join } from 'path';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const BASE_URL = 'https://rusden.com';

const staticPages: SitemapEntry[] = [
  { url: '/', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 1.0 },
  { url: '/nedvizhimost', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
  { url: '/nedvizhimost/prodazha', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
  { url: '/nedvizhimost/arenda', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
  { url: '/rabota', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.9 },
  { url: '/uslugi', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.8 },
  { url: '/tovary', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.8 },
  { url: '/blog', lastModified: new Date().toISOString(), changeFrequency: 'daily', priority: 0.7 },
  { url: '/o-nas', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.6 },
  { url: '/kontakty', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.6 },
  { url: '/pravila', lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.5 },
];

const cityPages: SitemapEntry[] = [
  'istanbul', 'antalya', 'bodrum', 'alanya', 'marmaris', 'fethiye', 'kemer', 'belek', 'side', 'kemer'
].map(city => ({
  url: `/gorod/${city}`,
  lastModified: new Date().toISOString(),
  changeFrequency: 'daily' as const,
  priority: 0.8,
}));

const categoryPages: SitemapEntry[] = [
  { category: 'kvartiry', subcategory: 'prodazha', priority: 0.9 },
  { category: 'kvartiry', subcategory: 'arenda', priority: 0.9 },
  { category: 'villy', subcategory: 'prodazha', priority: 0.8 },
  { category: 'villy', subcategory: 'arenda', priority: 0.8 },
  { category: 'doma', subcategory: 'prodazha', priority: 0.8 },
  { category: 'doma', subcategory: 'arenda', priority: 0.8 },
  { category: 'zemlya', subcategory: 'prodazha', priority: 0.7 },
  { category: 'kommercheskaya', subcategory: 'prodazha', priority: 0.7 },
].map(({ category, subcategory, priority }) => ({
  url: `/nedvizhimost/${subcategory}/${category}`,
  lastModified: new Date().toISOString(),
  changeFrequency: 'daily' as const,
  priority,
}));

const blogCategories = [
  'nedvizhimost',
  'rabota',
  'emigratsiya',
  'zhizn-v-turtsii',
  'yuridicheskie-sovety',
  'finansy',
  'meditsina',
  'obrazovanie',
];

const generateDynamicEntries = (): SitemapEntry[] => {
  // Здесь будет код для получения реальных данных из базы
  // Пока генерируем примеры

  const realEstateListings: SitemapEntry[] = Array.from({ length: 100 }, (_, i) => ({
    url: `/nedvizhimost/prodazha/kvartiry/istanbul/${i + 1}`,
    lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const jobListings: SitemapEntry[] = Array.from({ length: 50 }, (_, i) => ({
    url: `/rabota/istanbul/${i + 1}`,
    lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const blogPosts: SitemapEntry[] = blogCategories.map((category, i) => ({
    url: `/blog/${category}/${i + 1}`,
    lastModified: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...realEstateListings, ...jobListings, ...blogPosts];
};

const generateSitemap = (entries: SitemapEntry[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${entries.map(entry => `
        <url>
          <loc>${BASE_URL}${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency}</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `).join('')}
    </urlset>
  `;
};

const generateSitemapIndex = (sitemaps: string[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps.map(sitemap => `
        <sitemap>
          <loc>${BASE_URL}/sitemaps/${sitemap}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>
      `).join('')}
    </sitemapindex>
  `;
};

const main = () => {
  try {
    const publicDir = join(process.cwd(), 'public');
    const sitemapsDir = join(publicDir, 'sitemaps');

    // Generate main sitemap
    const mainSitemapEntries = [...staticPages, ...cityPages, ...categoryPages];
    const mainSitemap = generateSitemap(mainSitemapEntries);
    writeFileSync(join(sitemapsDir, 'main.xml'), mainSitemap);

    // Generate listings sitemap
    const dynamicEntries = generateDynamicEntries();
    const listingsSitemap = generateSitemap(dynamicEntries);
    writeFileSync(join(sitemapsDir, 'listings.xml'), listingsSitemap);

    // Generate sitemap index
    const sitemapIndex = generateSitemapIndex(['main.xml', 'listings.xml']);
    writeFileSync(join(publicDir, 'sitemap.xml'), sitemapIndex);

    console.log('✅ Sitemaps generated successfully!');
    console.log(`📄 Main sitemap: ${join(sitemapsDir, 'main.xml')}`);
    console.log(`📄 Listings sitemap: ${join(sitemapsDir, 'listings.xml')}`);
    console.log(`📄 Sitemap index: ${join(publicDir, 'sitemap.xml')}`);

    const totalUrls = mainSitemapEntries.length + dynamicEntries.length;
    console.log(`📊 Total URLs: ${totalUrls}`);
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

export { main as generateSitemap };