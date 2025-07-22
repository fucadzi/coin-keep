import api from '../index';

export interface Balance {
    id: string;
    amount: number;
    currency_id: string;
}

export const balanceService = {
    async getBalances(): Promise<Balance[]> {
        return api.get<Balance[]>('/balances');
    },

    async getBalance(id: string): Promise<Balance> {
        return api.get<Balance>(`/balances/${id}`);
    },
};
