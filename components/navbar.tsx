'use client';

import { useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

const menuItems = [
  { label: 'Все', href: '/', category: null },
  {
    label: 'Недвижимость',
    category: 'realty',
    subcategories: [
      { label: 'Продажа', href: '/?category=realty&subcategory=sale' },
      { label: 'Аренда', href: '/?category=realty&subcategory=rent' },
    ]
  },
  { label: 'Работа', href: '/?category=job', category: 'job' },
  { label: 'Услуги', href: '/?category=service', category: 'service' },
  { label: 'Товары', href: '/?category=goods', category: 'goods' },
  {
    label: 'Авто',
    category: 'auto',
    subcategories: [
      { label: 'Аренда', href: '/?category=auto&subcategory=rent' },
      { label: 'Продажа', href: '/?category=auto&subcategory=sale' },
    ]
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = searchParams.get('category');

  const isActive = (category: string | null) => {
    if (pathname !== '/') return false;
    return currentCategory === category;
  };

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo />
            <p className="font-bold text-xl text-inherit">Rusden</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="center">
        {menuItems.map((item) => {
          if (item.subcategories) {
            return (
              <Dropdown key={item.category}>
                <NavbarItem isActive={isActive(item.category)}>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent h-auto min-h-0"
                      endContent={<FiChevronDown className="text-small" />}
                      radius="sm"
                      variant="light"
                      size="sm"
                    >
                      <span className={`text-sm ${isActive(item.category) ? "text-primary" : "text-foreground"}`}>
                        {item.label}
                      </span>
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label={item.label}>
                  {item.subcategories.map((sub) => (
                    <DropdownItem key={sub.href} as={Link} href={sub.href}>
                      {sub.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
          }

          return (
            <NavbarItem key={item.href} isActive={isActive(item.category)}>
              <Link
                color={isActive(item.category) ? "primary" : "foreground"}
                href={item.href}
                size="sm"
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => {
          if (item.subcategories) {
            return (
              <div key={`${item.category}-${index}`} className="flex flex-col gap-2">
                <NavbarMenuItem isActive={isActive(item.category)}>
                  <p className={`text-lg font-semibold ${isActive(item.category) ? "text-primary" : "text-foreground"}`}>
                    {item.label}
                  </p>
                </NavbarMenuItem>
                {item.subcategories.map((sub, subIndex) => (
                  <NavbarMenuItem key={`${sub.href}-${subIndex}`} className="pl-4">
                    <Link
                      className="w-full"
                      color="foreground"
                      href={sub.href}
                      size="md"
                    >
                      {sub.label}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </div>
            );
          }

          return (
            <NavbarMenuItem key={`${item.href}-${index}`} isActive={isActive(item.category)}>
              <Link
                className="w-full"
                color={isActive(item.category) ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
