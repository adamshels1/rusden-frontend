'use client';

import { Select, SelectItem } from '@heroui/select';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Input } from '@heroui/input';
import { useEffect, useState } from 'react';
import { getCategories, getCities } from '@/lib/api';
import type { ListingFilters } from '@/types/listing';

interface FiltersBarProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
}

export function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
    getCities().then(setCities).catch(console.error);
  }, []);

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value || undefined });
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
      <Select
        label="Категория"
        placeholder="Все категории"
        selectedKeys={filters.category ? [filters.category] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          handleCategoryChange(value);
        }}
        className="w-full md:w-1/4"
      >
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </Select>

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
