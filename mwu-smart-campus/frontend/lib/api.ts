import axios from 'axios';
import { Building, Category, CampusBoundary, RouteResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCategories = async (): Promise<Category[]> => {
    const res = await api.get('/categories');
    return res.data;
};

export const getBuildings = async (category?: string, query?: string): Promise<Building[]> => {
    const params: any = {};
    if (category) params.category = category;
    if (query) params.q = query;
    const res = await api.get('/buildings', { params });
    return res.data;
};

export const getCampusBoundary = async (): Promise<CampusBoundary> => {
    const res = await api.get('/campus-boundary');
    return res.data;
};

export const getRoute = async (from: [number, number], to: [number, number]): Promise<RouteResponse> => {
    const res = await api.get('/route', {
        params: {
            from: `${from[0]},${from[1]}`, 
            to: `${to[0]},${to[1]}`
        }
    });
    return res.data;
};
