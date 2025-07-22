'use client';

import { useEffect } from 'react';
import { BalanceTable } from '@/components/BalanceTable';
import { Auth } from '@/components/Auth';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function Home() {
    const { isAuthenticated, checkAuth } = useAuthStore();
    const { error: currenciesError, fetchCurrencies } = useCurrencyStore();
    const { error: balancesError, fetchBalances } = useBalanceStore();

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Fetch data only when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchCurrencies();
            fetchBalances();
        }
    }, [isAuthenticated, fetchCurrencies, fetchBalances]);

    // Show skeleton while checking auth
    if (isAuthenticated === undefined) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="flex flex-col items-center gap-4 pb-8 pt-6 px-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (currenciesError || balancesError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-500">
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p>{currenciesError || balancesError}</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center p-4">
                <Auth onAuthSuccess={checkAuth} />
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to CoinKeep!</h1>
            </div>

            <div className="w-full max-w-4xl">
                <BalanceTable />
            </div>
        </section>
    );
}
