'use client';

import { useEffect } from 'react';
import { BalanceTable } from '@/components/BalanceTable';
import { Auth } from '@/components/Auth';
import { useCurrencyStore } from '@/lib/store/useCurrencyStore';
import { useBalanceStore } from '@/lib/store/useBalanceStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import type { Balance } from '@/lib/api/services/balances';
import type { Currency } from '@/lib/api/services/currencies';
import type { TransformedBalance } from '@/types/balance';

export default function Home() {
    const { isAuthenticated, checkAuth } = useAuthStore();
    const {
        error: currenciesError,
        currencies,
        loading: currenciesLoading,
        fetchCurrencies,
    } = useCurrencyStore();
    const {
        error: balancesError,
        balances,
        loading: balancesLoading,
        fetchBalances,
    } = useBalanceStore();

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

    const transformBalances = (
        balances: Balance[],
        currencies: Currency[]
    ): TransformedBalance[] => {
        // Create currency map for lookups
        const currencyMap = currencies.reduce(
            (acc, currency) => {
                acc[currency.id] = currency;
                return acc;
            },
            {} as Record<string, Currency>
        );

        return balances.map((balance) => {
            const currency = currencyMap[balance.currency_id];
            return {
                id: balance.id,
                amount: balance.amount,
                currencyId: balance.currency_id,
                currencyCode: currency?.code || 'Unknown',
                currencySymbol: currency?.symbol || '',
            };
        });
    };

    // Show skeleton while checking auth
    if (isAuthenticated === undefined) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="flex flex-col items-center gap-4 pb-8 pt-6 px-6">
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

    const transformedBalances = transformBalances(balances, currencies);

    return (
        <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
            <div className="inline-block max-w-xl text-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to CoinKeep!</h1>
            </div>

            <div className="w-full max-w-4xl">
                <BalanceTable
                    data={transformedBalances}
                    isLoading={currenciesLoading || balancesLoading}
                />
            </div>
        </section>
    );
}
