import { ApiClient } from './client';

// Create API client instance
const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '');

export default api;
