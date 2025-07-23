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

import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Logo } from '@/components/Icons';
import { useAuthStore } from '@/lib/store/useAuthStore';

const USER_TYPE_COLORS = {
    member: '#2AFC98',
    partner: '#119DA4',
} as const;

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            window.location.reload(); // Refresh to reset all stores
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const userColor = user ? USER_TYPE_COLORS[user.type as keyof typeof USER_TYPE_COLORS] : '';

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
                <NavbarItem className="flex items-center gap-4">
                    {isAuthenticated && user && (
                        <Button
                            isDisabled
                            variant="bordered"
                            className="gap-2"
                            style={{
                                opacity: 1,
                                borderColor: userColor,
                                color: userColor,
                            }}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: userColor }}
                            />
                            <span className="text-sm capitalize">{user.type}</span>
                        </Button>
                    )}
                    <ThemeSwitch />
                    {isAuthenticated && (
                        <Button
                            color="danger"
                            variant="light"
                            onClick={handleLogout}
                            className="focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        >
                            Logout
                        </Button>
                    )}
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
                    {isAuthenticated && user && (
                        <Button
                            isDisabled
                            variant="bordered"
                            className="gap-2"
                            style={{
                                opacity: 1,
                                borderColor: userColor,
                                color: userColor,
                            }}
                        >
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: userColor }}
                            />
                            <span className="text-sm capitalize">{user.type}</span>
                        </Button>
                    )}
                    {isAuthenticated && (
                        <NavbarMenuItem>
                            <Button
                                color="danger"
                                variant="light"
                                className="w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
