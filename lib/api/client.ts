type FetchOptions = RequestInit & {
    params?: Record<string, string>;
};

class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public data: unknown
    ) {
        super(`API Error: ${status} ${statusText}`);
        this.name = 'ApiError';
    }
}

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText, data);
        }

        return data as T;
    }

    private buildUrl(endpoint: string, params?: Record<string, string>): string {
        const url = new URL(endpoint, this.baseUrl);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }

        return url.toString();
    }

    async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            ...fetchOptions,
            method: 'GET',
        });

        return this.handleResponse<T>(response);
    }

    // TODO: Implement POST, PUT, DELETE methods
}
