'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@heroui/spinner';
import { ListingCard } from '@/components/listing-card';
import { SearchBar } from '@/components/search-bar';
import { FiltersBar } from '@/components/filters-bar';
import { getListings } from '@/lib/api';
import type { Listing, ListingFilters } from '@/types/listing';

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<ListingFilters>({});

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await getListings({ ...filters, search });
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchListings();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, filters]);

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Rusden</h1>
        <p className="text-default-500">Объявления для русскоязычных в Турции</p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      <FiltersBar filters={filters} onFiltersChange={setFilters} />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <p className="text-small text-default-500">
            Найдено: {listings.length} объявлений
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          {listings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-default-500">Объявления не найдены</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
