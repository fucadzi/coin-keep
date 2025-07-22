'use client';

import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from '@heroui/navbar';
import { Button } from '@heroui/button';
import NextLink from 'next/link';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Logo } from '@/components/icons';
import { useAuthStore } from '@/lib/store/useAuthStore';

export const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload(); // Refresh to reset all stores
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <HeroUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Logo />
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            {/* Desktop/Tablet Theme Switch and Logout */}
            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem>
                {isAuthenticated && (
                    <NavbarItem>
                        <Button color="danger" variant="light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </NavbarItem>
                )}
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
                    {isAuthenticated && (
                        <NavbarMenuItem>
                            <Button
                                color="danger"
                                variant="light"
                                className="w-full"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </NavbarMenuItem>
                    )}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};
