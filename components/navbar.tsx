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
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

const menuItems = [
  { label: 'Все', href: '/', category: null },
  { label: 'Недвижимость', href: '/?category=realty', category: 'realty' },
  { label: 'Работа', href: '/?category=job', category: 'job' },
  { label: 'Услуги', href: '/?category=service', category: 'service' },
  { label: 'Товары', href: '/?category=goods', category: 'goods' },
  { label: 'Мероприятия', href: '/?category=event', category: 'event' },
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
        {menuItems.map((item) => (
          <NavbarItem key={item.href} isActive={isActive(item.category)}>
            <Link
              color={isActive(item.category) ? "primary" : "foreground"}
              href={item.href}
              size="sm"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
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
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
