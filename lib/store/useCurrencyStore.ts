import { create } from 'zustand';
import { Currency, currencyService } from '@/lib/api/services/currencies';

interface CurrencyState {
    currencies: Currency[];
    loading: boolean;
    error: string | null;
    fetchCurrencies: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
    currencies: [],
    loading: false,
    error: null,
    fetchCurrencies: async () => {
        try {
            set({ loading: true, error: null });
            const currencies = await currencyService.getAllCurrencies();
            set({ currencies, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch currencies',
                loading: false,
            });
        }
    },
}));
