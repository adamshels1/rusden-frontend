"use client";

import type { ListingFilters } from "@/types/listing";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

import { getCities, getSubcategories } from "@/lib/api";

interface FiltersBarProps {
  filters: ListingFilters;
  onFiltersChange: (filters: ListingFilters) => void;
}

export function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    getCities().then(setCities).catch((error) => {
      console.error('Error loading cities:', error);
      setCities([]);
    });
  }, []);

  // Загружаем подкатегории когда меняется категория
  useEffect(() => {
    if (filters.category) {
      // Для realty и auto показываем стандартные подкатегории
      if (filters.category === "realty" || filters.category === "auto") {
        setSubcategories(["Аренда", "Продажа"]);
      } else {
        // Для остальных загружаем из API
        getSubcategories(filters.category)
          .then(setSubcategories)
          .catch(console.error);
      }
    } else {
      setSubcategories([]);
    }
  }, [filters.category]);

  const handleSubcategoryChange = (value: string) => {
    onFiltersChange({ ...filters, subcategory: value || undefined });
  };

  // Переводим подкатегории на русский для отображения
  const getSubcategoryLabel = (sub: string) => {
    const labels: Record<string, string> = {
      rent: "Аренда",
      sale: "Продажа",
      Аренда: "Аренда",
      Продажа: "Продажа",
    };

    return labels[sub] || sub;
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
          allowsCustomValue
          className="w-full md:w-1/4"
          label="Тип"
          placeholder="Выберите тип"
          selectedKey={filters.subcategory || null}
          onSelectionChange={(key) => {
            handleSubcategoryChange((key as string) || "");
          }}
        >
          {subcategories.map((sub) => (
            <AutocompleteItem key={sub}>
              {sub}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}

      <Autocomplete
        allowsCustomValue
        className="w-full md:w-1/4"
        label="Город"
        placeholder="Выберите город"
        selectedKey={filters.location || null}
        onSelectionChange={(key) => {
          handleLocationChange((key as string) || "");
        }}
      >
        {cities.map((city) => (
          <AutocompleteItem key={city}>
            {city}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      <Input
        className="w-full md:w-1/4"
        label="Цена от"
        placeholder="0"
        type="number"
        value={filters.minPrice?.toString() || ""}
        onValueChange={handleMinPriceChange}
      />

      <Input
        className="w-full md:w-1/4"
        label="Цена до"
        placeholder="∞"
        type="number"
        value={filters.maxPrice?.toString() || ""}
        onValueChange={handleMaxPriceChange}
      />
    </div>
  );
}
