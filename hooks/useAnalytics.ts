import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    // Only load analytics if GA_ID is available
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
        send_page_view: true,
      });
    }
  };

  const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const trackSearch = (query: string, resultsCount?: number) => {
    event({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
    });
  };

  const trackListingView = (listingId: string, category: string, price?: number) => {
    event({
      action: 'view_item',
      category: 'ecommerce',
      label: listingId,
      value: price,
    });

    // Enhanced ecommerce tracking
    trackCustomEvent('view_item', {
      item_id: listingId,
      item_category: category,
      value: price,
      currency: 'TRY',
    });
  };

  const trackContactForm = (formType: string) => {
    event({
      action: 'form_submit',
      category: 'lead',
      label: formType,
    });
  };

  const trackPhoneCall = (phoneNumber: string, source: string) => {
    event({
      action: 'phone_call',
      category: 'lead',
      label: `${phoneNumber}|${source}`,
    });
  };

  const trackFavorite = (listingId: string, action: 'add' | 'remove') => {
    event({
      action: action === 'add' ? 'add_to_wishlist' : 'remove_from_wishlist',
      category: 'engagement',
      label: listingId,
    });
  };

  const trackShare = (url: string, platform: string) => {
    event({
      action: 'share',
      category: 'social',
      label: `${platform}|${url}`,
    });
  };

  const trackFilterUsage = (filters: Record<string, any>) => {
    event({
      action: 'filter_applied',
      category: 'search',
      label: JSON.stringify(filters),
    });
  };

  const trackPageScroll = (depth: number) => {
    event({
      action: 'scroll',
      category: 'engagement',
      label: `${depth}%`,
    });
  };

  const trackError = (error: Error, context?: string) => {
    event({
      action: 'exception',
      category: 'error',
      label: `${error.message}|${context || 'unknown'}`,
    });
  };

  // Real estate specific tracking
  const trackRealEstateSearch = (params: {
    location?: string;
    propertyType?: string;
    transactionType?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}:${value}`)
      .join('|');

    event({
      action: 'real_estate_search',
      category: 'search',
      label: queryParams,
    });
  };

  const trackPropertyInquiry = (listingId: string, contactMethod: 'phone' | 'message') => {
    event({
      action: 'property_inquiry',
      category: 'lead',
      label: `${listingId}|${contactMethod}`,
    });
  };

  // Job specific tracking
  const trackJobApplication = (jobId: string, company: string) => {
    event({
      action: 'job_application',
      category: 'job',
      label: `${jobId}|${company}`,
    });
  };

  return {
    pageview,
    event,
    trackCustomEvent,
    trackSearch,
    trackListingView,
    trackContactForm,
    trackPhoneCall,
    trackFavorite,
    trackShare,
    trackFilterUsage,
    trackPageScroll,
    trackError,
    trackRealEstateSearch,
    trackPropertyInquiry,
    trackJobApplication,
  };
};

// Web Vitals tracking
export const trackWebVitals = (metric: any) => {
  if (!GA_TRACKING_ID) return;

  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: metric.name,
      value: metric.value,
      id: metric.id,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {
    // Ignore analytics errors
  });
};

// Consent management
export const useCookieConsent = () => {
  const hasConsent = typeof window !== 'undefined'
    ? localStorage.getItem('cookie-consent') === 'granted'
    : false;

  const grantConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'granted');

      // Update Google Analytics consent
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
        });
      }
    }
  };

  const denyConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', 'denied');

      // Update Google Analytics consent
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
        });
      }
    }
  };

  const resetConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cookie-consent');
    }
  };

  return {
    hasConsent,
    grantConsent,
    denyConsent,
    resetConsent,
  };
};