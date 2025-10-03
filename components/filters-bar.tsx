'use client';

import { Select, SelectItem } from '@heroui/select';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Input } from '@heroui/input';
import { useEffect, useState } from 'react';
import { getCategories, getCities, getSubcategories } from '@/lib/api';
import type { ListingFilters } from '@/types/listing';

interface FiltersBarProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
}

export function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    getCities().then(setCities).catch(console.error);
  }, []);

  // Загружаем подкатегории когда меняется категория
  useEffect(() => {
    if (filters.category) {
      getSubcategories(filters.category).then(setSubcategories).catch(console.error);
    } else {
      setSubcategories([]);
    }
  }, [filters.category]);

  const handleSubcategoryChange = (value: string) => {
    onFiltersChange({ ...filters, subcategory: value || undefined });
  };

  const handleLocationChange = (value: string) => {
    onFiltersChange({ ...filters, location: value || undefined });
  };

  const handleMinPriceChange = (value: string) => {
    const num = parseInt(value);
    onFiltersChange({ ...filters, minPrice: isNaN(num) ? undefined : num });
  };

  const handleMaxPriceChange = (value: string) => {
    const num = parseInt(value);
    onFiltersChange({ ...filters, maxPrice: isNaN(num) ? undefined : num });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {subcategories.length > 0 && (
        <Autocomplete
          label="Тип"
          placeholder="Выберите тип"
          selectedKey={filters.subcategory || null}
          onSelectionChange={(key) => {
            handleSubcategoryChange(key as string || '');
          }}
          className="w-full md:w-1/4"
          allowsCustomValue
        >
          {subcategories.map((sub) => (
            <AutocompleteItem key={sub} value={sub}>
              {sub}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}

      <Autocomplete
        label="Город"
        placeholder="Выберите город"
        selectedKey={filters.location || null}
        onSelectionChange={(key) => {
          handleLocationChange(key as string || '');
        }}
        className="w-full md:w-1/4"
        allowsCustomValue
      >
        {cities.map((city) => (
          <AutocompleteItem key={city} value={city}>
            {city}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Input
        type="number"
        label="Цена от"
        placeholder="0"
        value={filters.minPrice?.toString() || ''}
        onValueChange={handleMinPriceChange}
        className="w-full md:w-1/4"
      />

      <Input
        type="number"
        label="Цена до"
        placeholder="∞"
        value={filters.maxPrice?.toString() || ''}
        onValueChange={handleMaxPriceChange}
        className="w-full md:w-1/4"
      />
    </div>
  );
}
