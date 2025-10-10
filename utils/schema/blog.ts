import { JsonLdData, BlogPost } from '@/types/seo';

export const generateBlogSchema = (post: BlogPost): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rusden',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rusden.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rusden.com/blog/${post.slug}`,
    },
    wordCount: post.content.length,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'ru',
    isAccessibleForFree: true,
  };
};

export const generateBlogAggregateSchema = (posts: BlogPost[]): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Блог Rusden',
    description: 'Полезные статьи о жизни, работе и недвижимости в Турции',
    url: 'https://rusden.com/blog',
    author: {
      '@type': 'Organization',
      name: 'Rusden',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rusden',
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://rusden.com/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: post.author,
    })),
  };
};