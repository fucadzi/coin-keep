export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'CoinKeep',
    description: 'View available funds.',
    navItems: [
        // {
        //     label: 'Home',
        //     href: '/',
        // },
        // {
        //     label: 'Docs',
        //     href: '/docs',
        // },
    ],
    navMenuItems: [
        {
            label: 'Profile',
            href: '/profile',
        },
    ],
};
