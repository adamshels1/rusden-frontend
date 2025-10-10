import { JsonLdData, JobPosting } from '@/types/seo';

export const generateJobSchema = (job: JobPosting): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Rusden Job ID',
      value: job.id,
    },
    datePosted: job.createdAt,
    dateModified: job.updatedAt,
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company.name,
      description: job.company.description,
      logo: job.company.logo,
      sameAs: job.company.website,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
        addressLocality: job.city,
        addressRegion: job.region,
      },
    },
    jobBenefits: job.benefits,
    qualifications: job.requirements,
    experienceRequirements: {
      '@type': 'Text',
      value: job.experienceRequirements,
    },
    industry: 'Various',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Turkey',
    },
    workHours: 'Full-time',
    salaryCurrency: job.currency || 'TRY',
    baseSalary: job.salary ? {
      '@type': 'MonetaryAmount',
      value: {
        '@type': 'QuantitativeValue',
        value: job.salary,
        unitText: job.salaryPeriod || 'MONTH',
      },
    } : undefined,
  };
};

export const generateJobAggregateSchema = (jobs: JobPosting[]): JsonLdData => {
  const jobTypes = Array.from(new Set(jobs.map(job => job.employmentType)));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Вакансии в Турции',
    description: 'Актуальные вакансии для русскоязычных специалистов в Турции',
    numberOfItems: jobs.length,
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: job.title,
        hiringOrganization: job.company.name,
        jobLocation: job.city,
        datePosted: job.createdAt,
        url: `https://rusden.com/rabota/${job.city}/${job.id}`,
      },
    })),
  };
};