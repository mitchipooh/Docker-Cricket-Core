/// <reference types="vite/client" />
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';


export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('cc_auth_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
};

export const getApiUrl = () => API_BASE_URL;
