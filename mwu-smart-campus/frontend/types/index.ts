export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Building {
    id: number;
    category_id: number;
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
    image_url?: string;
    category?: Category;
}

export interface CampusBoundary {
    id: number;
    name: string;
    geometry: {
        minLat: number;
        minLng: number;
        maxLat: number;
        maxLng: number;
    }; // Or Polygon logic if I chose that
}

export interface RouteResponse {
    routes: {
        geometry: string; // GeoJSON string or object depending on OSRM call
        duration: number;
        distance: number;
    }[];
}
