import api from '../index';

export interface Balance {
    id: string;
    amount: number;
    currency_id: string;
}

export const balanceService = {
    async getBalances(page: number, limit: number): Promise<Balance[]> {
        return api.get<Balance[]>('/balances', {
            params: {
                page: page.toString(),
                limit: limit.toString(),
            },
        });
    },
};
