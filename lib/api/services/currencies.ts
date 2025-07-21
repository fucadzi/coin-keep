import api from '../index';

export interface Currency {
    id: string;
    code: string;
    symbol: string;
}

export const currencyService = {
    async getAllCurrencies(): Promise<Currency[]> {
        return api.get<Currency[]>('/currencies');
    },

    async getCurrencyById(id: string): Promise<Currency> {
        return api.get<Currency>(`/currencies/${id}`);
    },
};
