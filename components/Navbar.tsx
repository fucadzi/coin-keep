import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from '@heroui/navbar';
import { Link } from '@heroui/link';
import NextLink from 'next/link';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Logo } from '@/components/icons';

export const Navbar = () => {
    return (
        <HeroUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Logo />
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            {/* Mobile Menu Toggle */}
            <NavbarContent className="sm:hidden basis-1/5 sm:basis-full" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu>
                <div className="mx-4 mt-2 flex justify-end sm:hidden">
                    <ThemeSwitch />
                </div>

                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? 'primary'
                                        : index === siteConfig.navMenuItems.length - 1
                                          ? 'danger'
                                          : 'foreground'
                                }
                                href={item.href}
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};
