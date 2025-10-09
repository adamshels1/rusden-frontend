"use client";

import { Input } from "@heroui/input";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Поиск объявлений...",
}: SearchBarProps) {
  return (
    <Input
      isClearable
      classNames={{
        base: "w-full",
        inputWrapper: [
          "bg-default-100",
          "hover:bg-default-200",
          "group-data-[focused=true]:bg-default-100",
        ],
      }}
      placeholder={placeholder}
      startContent={<FiSearch className="text-default-400" />}
      value={value}
      onValueChange={onChange}
    />
  );
}
