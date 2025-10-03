import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Logo />
            <p className="font-bold text-xl text-inherit">Rusden</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
