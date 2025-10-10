export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Rusden",
  title: "Rusden - Объявления в Турции",
  description: "Платформа объявлений для русскоязычных в Турции. Недвижимость, работа, услуги, товары. Актуальные объявления в Стамбуле, Анталье, Бодруме и других городах.",
  keywords: [
    "объявления турция",
    "недвижимость турция",
    "русские в турции",
    "работа в турции",
    "купить квартиру в турции",
    "аренда в турции",
    "эмиграция в турцию",
    "жизнь в турции",
    "станбул недвижимость",
    "анталья недвижимость"
  ],
  url: "https://rusden.com",
  locale: "ru",
  author: "Rusden Team",

  // Open Graph defaults
  openGraph: {
    type: "website",
    siteName: "Rusden",
    locale: "ru_RU",
    image: "/og-image.jpg",
    imageWidth: 1200,
    imageHeight: 630,
  },

  // Twitter Card defaults
  twitter: {
    handle: "@rusden_turkey",
    site: "@rusden_turkey",
    cardType: "summary_large_image",
  },

  // Navigation items
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Недвижимость",
      href: "/nedvizhimost",
    },
    {
      label: "Работа",
      href: "/rabota",
    },
    {
      label: "Услуги",
      href: "/uslugi",
    },
    {
      label: "Товары",
      href: "/tovary",
    },
    {
      label: "Блог",
      href: "/blog",
    },
    {
      label: "О нас",
      href: "/o-nas",
    },
  ],

  // Mobile menu items
  navMenuItems: [
    {
      label: "Добавить объявление",
      href: "/dobavit-obyavlenie",
    },
    {
      label: "Профиль",
      href: "/profile",
    },
    {
      label: "Сохраненные",
      href: "/sohranennye",
    },
    {
      label: "Сообщения",
      href: "/soobshcheniya",
    },
    {
      label: "Настройки",
      href: "/settings",
    },
    {
      label: "Помощь",
      href: "/pomoshch",
    },
    {
      label: "Контакты",
      href: "/kontakty",
    },
  ],

  // Social links
  links: {
    website: "https://rusden.com",
    facebook: "https://facebook.com/rusden",
    instagram: "https://instagram.com/rusden",
    twitter: "https://twitter.com/rusden_turkey",
    youtube: "https://youtube.com/@rusden",
    telegram: "https://t.me/rusden",
    whatsapp: "https://wa.me/905555555555",
  },

  // Contact information
  contact: {
    phone: "+90 555 555 55 55",
    email: "info@rusden.com",
    address: "Istanbul, Turkey",
    workingHours: "Пн-Пт: 9:00-18:00",
  },

  // SEO configuration
  seo: {
    defaultTitle: "Rusden - Объявления в Турции",
    defaultDescription: "Платформа объявлений для русскоязычных в Турции. Недвижимость, работа, услуги, товары.",
    separator: " - ",
    titleTemplate: "%s" + " - " + "Rusden",
  },

  // Real estate categories
  realEstateCategories: [
    {
      id: "kvartiry",
      name: "Квартиры",
      slug: "kvartiry",
      description: "Продажа и аренда квартир в Турции",
    },
    {
      id: "villy",
      name: "Виллы",
      slug: "villy",
      description: "Продажа и аренда вилл в Турции",
    },
    {
      id: "doma",
      name: "Дома",
      slug: "doma",
      description: "Продажа и аренда частных домов",
    },
    {
      id: "zemlya",
      name: "Земля",
      slug: "zemlya",
      description: "Земельные участки в Турции",
    },
    {
      id: "kommercheskaya",
      name: "Коммерческая",
      slug: "kommercheskaya",
      description: "Коммерческая недвижимость",
    },
  ],

  // Cities
  cities: [
    { id: "istanbul", name: "Стамбул", slug: "istanbul", priority: true },
    { id: "antalya", name: "Анталья", slug: "antalya", priority: true },
    { id: "bodrum", name: "Бодрум", slug: "bodrum", priority: true },
    { id: "alanya", name: "Аланья", slug: "alanya", priority: true },
    { id: "marmaris", name: "Мармарис", slug: "marmaris", priority: false },
    { id: "fethiye", name: "Фетхие", slug: "fethiye", priority: false },
    { id: "kemer", name: "Кемер", slug: "kemer", priority: false },
    { id: "belek", name: "Белек", slug: "belek", priority: false },
    { id: "side", name: "Сиде", slug: "side", priority: false },
    { id: "izmir", name: "Измир", slug: "izmir", priority: false },
  ],

  // Supported languages
  languages: [
    { code: "ru", name: "Русский", flag: "🇷🇺", default: true },
    { code: "tr", name: "Türkçe", flag: "🇹🇷", default: false },
    { code: "en", name: "English", flag: "🇬🇧", default: false },
  ],

  // Analytics configuration
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    yandexMetricaId: process.env.NEXT_PUBLIC_YANDEX_METRICA_ID,
  },

  // Features
  features: {
    search: true,
    favorites: true,
    messaging: true,
    mapView: true,
    imageGallery: true,
    phoneVerification: true,
    emailNotifications: true,
    pushNotifications: false, // Future feature
    aiRecommendations: false, // Future feature
  },
};
