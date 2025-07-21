'use client';

import { useEffect, useState } from 'react';
import { currencyService, Currency } from '@/lib/api/services/currencies';

export function CurrencyList() {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCurrencies() {
            try {
                const data = await currencyService.getAllCurrencies();
                setCurrencies(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch currencies'));
            } finally {
                setLoading(false);
            }
        }

        fetchCurrencies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {currencies.map((currency) => (
                <li key={currency.id}>
                    {currency.code} - {currency.symbol}
                </li>
            ))}
        </ul>
    );
}
