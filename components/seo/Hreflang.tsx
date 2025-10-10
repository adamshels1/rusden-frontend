import Head from 'next/head';
import { useRouter } from 'next/router';

interface HreflangProps {
  alternateUrls: { [key: string]: string };
}

export const Hreflang: React.FC<HreflangProps> = ({ alternateUrls }) => {
  const router = useRouter();
  const currentPath = router.asPath;

  // Get language codes and their full names
  const languages = {
    ru: 'ru-RU',
    tr: 'tr-TR',
    en: 'en-US',
  };

  return (
    <Head>
      {Object.entries(alternateUrls).map(([locale, baseUrl]) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={languages[locale as keyof typeof languages] || locale}
          href={`${baseUrl}${currentPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${alternateUrls.ru}${currentPath}`}
      />
    </Head>
  );
};

// Hook for generating alternate URLs
export const useAlternateUrls = () => {
  const router = useRouter();

  const generateAlternateUrls = (path: string = ''): { [key: string]: string } => {
    const baseUrl = 'https://rusden.com';

    return {
      ru: baseUrl,
      tr: `${baseUrl}/tr`,
      en: `${baseUrl}/en`,
    };
  };

  return { generateAlternateUrls };
};

// Language selector component
interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className,
}) => {
  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`
            px-3 py-1 rounded-md text-sm font-medium transition-colors
            ${currentLanguage === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="mr-1">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};