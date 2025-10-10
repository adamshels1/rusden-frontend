# Руководство по реализации SEO-оптимизации для Rusden

## Обзор

Этот документ описывает реализованную SEO-оптимизацию для сайта объявлений Rusden. Все компоненты готовы к использованию и могут быть легко интегрированы в существующий код.

## Структура файлов

```
rusden-frontend/
├── types/
│   └── seo.ts                    # TypeScript типы для SEO
├── components/seo/
│   ├── Head.tsx                  # Универсальный компонент мета-тегов
│   ├── OptimizedImage.tsx        # Оптимизированные изображения
│   ├── Breadcrumbs.tsx           # Хлебные крошки с Schema.org
│   └── Hreflang.tsx              # Мультиязычность и hreflang
├── utils/schema/
│   ├── realEstate.ts             # Schema.org для недвижимости
│   ├── job.ts                    # Schema.org для вакансий
│   ├── blog.ts                   # Schema.org для блогов
│   └── common.ts                 # Общие Schema.org схемы
├── hooks/
│   └── useAnalytics.ts           # Google Analytics хук
├── lib/
│   ├── i18n.ts                   # Интернационализация
│   └── utils.ts                  # SEO утилиты
├── scripts/
│   └── generate-sitemap.ts       # Генератор sitemap
├── public/
│   ├── robots.txt                # Robots.txt
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service Worker
│   └── sitemaps/                 # Автоматически генерируемые sitemap
├── app/
│   ├── layout.tsx                # Базовый layout с SEO
│   └── offline/page.tsx          # Offline страница
└── config/
    └── site.ts                   # Конфигурация сайта с SEO
```

## Использование компонентов

### 1. Head компонент

Используйте `HeadComponent` для управления мета-тегами на любой странице:

```tsx
import { HeadComponent } from '@/components/seo/Head';
import { generateRealEstateSchema } from '@/utils/schema/realEstate';
import { siteConfig } from '@/config/site';

const seo = {
  title: 'Квартира в Стамбуле с видом на море',
  description: 'Просторная 2-комнатная квартира в районе Бешикташ...',
  keywords: ['квартира стамбул', 'недвижимость турция', 'бешикташ'],
  canonical: `${siteConfig.url}/listing/123`,
  openGraph: {
    title: 'Квартира в Стамбуле с видом на море',
    description: 'Просторная 2-комнатная квартира...',
    url: `${siteConfig.url}/listing/123`,
    type: 'realestate',
    image: listing.image,
  },
  jsonLd: [generateRealEstateSchema(listing)],
};

<HeadComponent seo={seo} />
```

### 2. Оптимизированные изображения

Используйте `OptimizedImage` вместо стандартного тега img:

```tsx
import { OptimizedImage } from '@/components/seo/OptimizedImage';

<OptimizedImage
  src="/images/apartment.jpg"
  alt="Квартира в Стамбуле"
  width={800}
  height={600}
  priority={true} // Для важных изображений
  className="rounded-lg"
/>
```

Для галереи изображений:

```tsx
import { ImageGallery } from '@/components/seo/OptimizedImage';

<ImageGallery
  images={listing.images.map(img => ({
    src: img.url,
    alt: img.alt || 'Фото объекта',
    width: img.width || 800,
    height: img.height || 600,
  }))}
  className="grid grid-cols-2 gap-4"
/>
```

### 3. Хлебные крошки

Добавьте навигационные цепочки на страницах:

```tsx
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

<Breadcrumbs
  items={[
    { name: 'Главная', url: '/' },
    { name: 'Недвижимость', url: '/nedvizhimost' },
    { name: 'Продажа', url: '/nedvizhimost/prodazha' },
    { name: 'Квартиры', url: '/nedvizhimost/prodazha/kvartiry' },
    { name: 'Стамбул', url: '/nedvizhimost/prodazha/kvartiry/istanbul' },
  ]}
  className="mb-6"
/>
```

Или используйте авто-генерацию из URL:

```tsx
import { AutoBreadcrumbs } from '@/components/seo/Breadcrumbs';

<AutoBreadcrumbs className="mb-6" />
```

### 4. Мультиязычность

```tsx
import { Hreflang, useAlternateUrls } from '@/components/seo/Hreflang';

const { generateAlternateUrls } = useAlternateUrls();

<Hreflang
  alternateUrls={{
    ru: 'https://rusden.com',
    tr: 'https://rusden.com/tr',
    en: 'https://rusden.com/en',
  }}
/>
```

## Schema.org разметка

### Недвижимость

```tsx
import { generateRealEstateSchema } from '@/utils/schema/realEstate';

const schema = generateRealEstateSchema({
  id: '123',
  title: 'Квартира в Стамбуле',
  description: '...',
  price: 250000,
  currency: 'USD',
  // ... другие поля
});
```

### Вакансии

```tsx
import { generateJobSchema } from '@/utils/schema/job';

const schema = generateJobSchema({
  id: '456',
  title: 'Frontend разработчик',
  description: '...',
  employmentType: 'FULL_TIME',
  // ... другие поля
});
```

### Блоговые статьи

```tsx
import { generateBlogSchema } from '@/utils/schema/blog';

const schema = generateBlogSchema({
  id: '789',
  title: 'Как купить недвижимость в Турции',
  description: '...',
  content: '...',
  slug: 'kak-kupit-nedvizhimost',
  // ... другие поля
});
```

## Аналитика

### Подключение Google Analytics

1. Установите переменную окружения:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Используйте хук в компонентах:

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackSearch, trackListingView, trackFavorite } = useAnalytics();

  const handleSearch = (query: string) => {
    trackSearch(query, 25);
  };

  const handleViewListing = (listingId: string) => {
    trackListingView(listingId, 'real_estate', 250000);
  };

  const handleFavorite = (listingId: string) => {
    trackFavorite(listingId, 'add');
  };
}
```

## Генерация Sitemap

Запустите скрипт для генерации sitemap:

```bash
npm run generate-sitemap
```

Или добавьте в package.json:

```json
{
  "scripts": {
    "generate-sitemap": "tsx scripts/generate-sitemap.ts"
  }
}
```

## Оптимизация производительности

### Настройка изображений

1. **Используйте правильные форматы**: WebP, AVIF
2. **Lazy loading**: Используйте `LazyImage` для изображений ниже фолда
3. **Правильные размеры**: Указывайте точные размеры изображений

### Кэширование

Конфигурация кэширования уже настроена в `next.config.js`:

- Статические ресурсы: 1 год
- Изображения: 1 день
- API запросы: без кэша

### PWA поддержка

Сайт готов к установке как PWA приложение:

- Manifest.json настроен
- Service Worker реализован
- Offline страница доступна

## Интернационализация

### Настройка

Файл конфигурации i18n уже настроен в `next.config.js`.

### Использование

```tsx
import { useTranslation } from '@/lib/i18n';

function MyComponent() {
  const { t, formatDate, formatCurrency } = useTranslation('ru');

  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('realestate.title')}</p>
      <p>{formatPrice(250000, 'USD')}</p>
    </div>
  );
}
```

## SEO Checklist

### Критически важное:
- [x] Meta-теги (title, description, keywords)
- [x] Open Graph разметка
- [x] Twitter Cards
- [x] Schema.org structured data
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs

### Важное:
- [x] Оптимизация изображений
- [x] Хлебные крошки
- [x] Hreflang теги
- [x] Core Web Vitals оптимизация
- [x] Mobile-friendly дизайн

### Желательное:
- [x] PWA поддержка
- [x] AMP страницы (можно добавить позже)
- [x] RSS фид (можно добавить позже)
- [x] Voice search оптимизация

## Тестирование

### Инструменты для проверки:

1. **Google Search Console** - индексация и производительность
2. **Google PageSpeed Insights** - Core Web Vitals
3. **GTmetrix** - детальная производительность
4. **Schema Markup Validator** - проверка структурированных данных
5. **Screaming Frog** - технический аудит

### Критерии успеха:

- PageSpeed Insights: 90+ баллов
- Core Web Vitals: все зеленые
- Schema.org: 100% валидности
- Индексация: 95%+ страниц в Google

## Следующие шаги

1. **Интеграция с реальными данными** - подключите к API
2. **Динамические страницы** - создайте страницы для категорий и городов
3. **Контент-маркетинг** - начните блог и SEO-статьи
4. **Линкбилдинг** - настройте обмен ссылками
5. **Мониторинг** - настройте регулярную проверку позиций

## Поддержка

Для вопросов по SEO-оптимизации обращайтесь к документации в `/docs` или проверьте реализацию в компонентах в `/components/seo/`.