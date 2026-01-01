"use client";

import type { Listing, ListingFilters } from "@/types/listing";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";

import { ListingCardWrapper } from "@/components/listing-card-wrapper";

export { HomePage };
import { SearchBar } from "@/components/search-bar";
import { FiltersBar } from "@/components/filters-bar";
import { getListings } from "@/lib/api";

const LISTINGS_PER_PAGE = 12;

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ListingFilters>({});
  const [page, setPage] = useState(1);
  const [totalListings, setTotalListings] = useState(0);
  const [shouldRestore, setShouldRestore] = useState(false);

  // Функция сохранения состояния
  const saveState = () => {
    if (listings.length > 0) {
      sessionStorage.setItem('listingsState', JSON.stringify({
        listings,
        page,
        totalListings,
        search,
        filters,
        scrollY: window.scrollY,
        timestamp: Date.now()
      }));
    }
  };

  // Восстанавливаем состояние при возврате
  useEffect(() => {
    const savedState = sessionStorage.getItem('listingsState');

    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        const age = Date.now() - state.timestamp;

        // Восстанавливаем только если состояние не старше 5 минут
        if (age < 5 * 60 * 1000) {
          setListings(state.listings);
          setPage(state.page);
          setTotalListings(state.totalListings);
          setSearch(state.search || "");
          setFilters(state.filters || {});
          setLoading(false);
          setShouldRestore(true);

          // Восстанавливаем позицию скролла
          setTimeout(() => {
            window.scrollTo(0, state.scrollY || 0);
          }, 100);

          // Очищаем сохраненное состояние
          sessionStorage.removeItem('listingsState');

          return;
        }
      } catch (e) {
        console.error('Error restoring state:', e);
      }
      sessionStorage.removeItem('listingsState');
    }
  }, []);

  // Читаем категорию, подкатегорию и страницу из URL
  useEffect(() => {
    // Пропускаем если восстанавливаем состояние
    if (shouldRestore) {
      setShouldRestore(false);
      return;
    }

    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const pageParam = searchParams.get("page");
    const newFilters: ListingFilters = {};

    if (category) newFilters.category = category;
    if (subcategory) newFilters.subcategory = subcategory;

    setFilters(newFilters);

    // Устанавливаем страницу из URL
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);

      if (!isNaN(pageNumber) && pageNumber > 0) {
        setPage(pageNumber);
      }
    } else {
      setPage(1);
    }
  }, [searchParams, shouldRestore]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * LISTINGS_PER_PAGE;
        const response = await getListings({
          ...filters,
          search,
          limit: LISTINGS_PER_PAGE,
          offset,
        });

        setListings(response.data);
        setTotalListings(response.meta.total);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchListings();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, filters, page]);

  const totalPages = Math.ceil(totalListings / LISTINGS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    // Обновляем URL с новым номером страницы
    const params = new URLSearchParams(searchParams.toString());

    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* <h1 className="text-4xl font-bold">Rusden</h1> */}
        <p className="text-default-500">
          Объявления для русскоязычных в Турции
        </p>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {/* <FiltersBar filters={filters} onFiltersChange={setFilters} /> */}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <p className="text-small text-default-500">
            Найдено: {totalListings} объявлений
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCardWrapper
                key={listing.id}
                currentPage={page}
                listing={listing}
                onNavigate={saveState}
              />
            ))}
          </div>
          {listings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-default-500">Объявления не найдены</p>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                page={page}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
