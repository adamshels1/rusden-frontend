import Link from 'next/link';
import { BreadcrumbItem } from '@/types/seo';
import { generateBreadcrumbSchema } from '@/utils/schema/common';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: string;
  homeLabel?: string;
  homeUrl?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  separator = '/',
  homeLabel = 'Главная',
  homeUrl = '/',
}) => {
  // Add home item if not present
  const allItems = items[0]?.url === homeUrl
    ? items
    : [{ name: homeLabel, url: homeUrl }, ...items];

  const schema = generateBreadcrumbSchema(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Навигационная цепочка"
        className={cn('flex items-center space-x-2 text-sm text-gray-600', className)}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <div key={item.url} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isLast ? (
                <span
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label={`Перейти к ${item.name}`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
};

// Helper function to generate breadcrumbs from URL
export const generateBreadcrumbsFromUrl = (url: string, additionalItems?: BreadcrumbItem[]): BreadcrumbItem[] => {
  const pathSegments = url.split('/').filter(segment => segment);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Главная', url: '/' }
  ];

  let currentUrl = '';

  // URL to Russian name mapping
  const nameMap: Record<string, string> = {
    'nedvizhimost': 'Недвижимость',
    'prodazha': 'Продажа',
    'arenda': 'Аренда',
    'kvartiry': 'Квартиры',
    'villy': 'Виллы',
    'doma': 'Дома',
    'zemlya': 'Земля',
    'kommercheskaya': 'Коммерческая',
    'rabota': 'Работа',
    'uslugi': 'Услуги',
    'tovary': 'Товары',
    'blog': 'Блог',
    'gorod': 'Город',
    'istanbul': 'Стамбул',
    'antalya': 'Анталья',
    'bodrum': 'Бодрум',
    'alanya': 'Аланья',
    'o-nas': 'О нас',
    'kontakty': 'Контакты',
    'pravila': 'Правила',
  };

  pathSegments.forEach((segment, index) => {
    currentUrl += `/${segment}`;

    // Skip numeric segments (like IDs)
    if (/^\d+$/.test(segment)) return;

    const name = nameMap[segment] ||
      segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    breadcrumbs.push({
      name,
      url: currentUrl
    });
  });

  if (additionalItems) {
    breadcrumbs.push(...additionalItems);
  }

  return breadcrumbs;
};

// Breadcrumb component that auto-generates from current path
interface AutoBreadcrumbsProps extends Omit<BreadcrumbsProps, 'items'> {
  additionalItems?: BreadcrumbItem[];
}

export const AutoBreadcrumbs: React.FC<AutoBreadcrumbsProps> = ({
  additionalItems,
  ...props
}) => {
  // In a real app, you'd get this from Next.js router
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const items = generateBreadcrumbsFromUrl(currentPath, additionalItems);

  return <Breadcrumbs items={items} {...props} />;
};