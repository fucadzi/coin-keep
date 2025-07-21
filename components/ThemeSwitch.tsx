'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';
import { useIsSSR } from '@react-aria/ssr';

import { SunFilledIcon, MoonFilledIcon } from '@/components/Icons';

export interface ThemeSwitchProps {
    className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const isSSR = useIsSSR();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${className || ''}`}
            onClick={toggleTheme}
        >
            {!isSSR && theme === 'dark' ? <SunFilledIcon /> : <MoonFilledIcon />}
        </button>
    );
};
