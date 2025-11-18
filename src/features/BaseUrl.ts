export const API_BASE_URLS = {
    FAKE_STORE: 'https://fakestoreapi.com',
    JSON_PLACEHOLDER: 'https://jsonplaceholder.typicode.com',
    MAAMS_API: 'https://maams.onrender.com/api'
} as const;

export const API_ENDPOINTS = {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: (id: number) => `/products/${id}`,
    PRODUCTS_CATEGORIES: '/products/categories',
    PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,

 
    USERS: '/users',
    USER_BY_ID: (id: number) => `/users/${id}`,


    MEDICINES: '/medicines',
    MEDICINE_BY_ID: (id: string) => `/medicines/${id}`,
    MEDICINES_BY_CATEGORY: (category: string) => `/medicines/category/${category}`,
} as const;

export const CACHE_TIME = {
    SHORT: 60,
    MEDIUM: 300,
    LONG: 900
} as const;
