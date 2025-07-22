import { create } from 'zustand';
import { Balance, balanceService } from '@/lib/api/services/balances';

interface BalanceState {
    balances: Balance[];
    loading: boolean;
    error: string | null;
    fetchBalances: () => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set) => ({
    balances: [],
    loading: false,
    error: null,
    fetchBalances: async () => {
        try {
            set({ loading: true, error: null });
            const balances = await balanceService.getBalances();
            set({ balances, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch balances',
                loading: false,
            });
        }
    },
}));
