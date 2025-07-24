import { create } from 'zustand';
import { Balance, balanceService } from '@/lib/api/services/balances';

interface BalanceState {
    balances: Balance[];
    loading: boolean;
    error: string | null;
    paging: {
        page: number;
        limit: number;
        total: number;
    };
    fetchBalances: (page?: number) => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set, get) => ({
    balances: [],
    loading: false,
    paging: {
        page: 1,
        limit: 100,
        total: 0,
    },
    error: null,
    fetchBalances: async (page?: number) => {
        try {
            const { paging } = get();
            const currentPage = page || paging.page;

            set({ loading: true, error: null });
            const balances = await balanceService.getBalances(currentPage, paging.limit);
            set({
                balances,
                loading: false,
                paging: {
                    ...paging,
                    page: currentPage,
                    total: balances.length,
                },
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch balances',
                loading: false,
            });
        }
    },
}));
