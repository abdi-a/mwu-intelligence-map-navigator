'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, DivIcon, LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { useEffect } from 'react';
import { Building, CampusBoundary } from '@/types';

// Helper to update map view
const MapUpdater = ({ center, zoom, bounds }: { center?: [number, number], zoom?: number, bounds?: LatLngBoundsExpression }) => {
    const map = useMap();
    
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (center) {
            map.flyTo(center, zoom || 18);
        }
    }, [center, zoom, bounds, map]);

    return null;
};

// Fix Leaflet Default Icon in Next
import L from 'leaflet';
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for categories (Simple colored SVGs or DivIcons)
const getCategoryIcon = (slug: string) => {
    let color = 'blue';
    if (slug === 'libraries') color = 'green';
    if (slug === 'cafes') color = 'orange';
    if (slug === 'dorms') color = 'purple';
    if (slug === 'admin') color = 'red';

    return new L.DivIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
        iconSize: [15, 15],
        iconAnchor: [7, 7],
    });
};

interface MapViewProps {
    boundary: CampusBoundary | null;
    buildings: Building[];
    selectedBuilding: Building | null;
    routeGeometry: any | null; // GeoJSON geometry from OSRM
    userLocation: [number, number] | null;
    onMarkerClick: (b: Building) => void;
}

const MapView = ({ boundary, buildings, selectedBuilding, routeGeometry, userLocation, onMarkerClick }: MapViewProps) => {
    
    // Default fallback if boundary not loaded yet
    const defaultCenter: [number, number] = [7.1320, 40.0050];
    const maxBounds: LatLngBoundsExpression | undefined = boundary ? [
        [boundary.geometry.minLat - 0.005, boundary.geometry.minLng - 0.005], // Add padding
        [boundary.geometry.maxLat + 0.005, boundary.geometry.maxLng + 0.005]
    ] : undefined;

    // Decode GeoJSON LineString if present
    const routePositions: LatLngExpression[] | null = routeGeometry && routeGeometry.coordinates 
        ? routeGeometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]) // OSRM is Lon,Lat -> Leaflet Lat,Lon
        : null;

    return (
        <MapContainer 
            center={defaultCenter} 
            zoom={16} 
            style={{ height: '100%', width: '100%' }}
            maxBounds={maxBounds}
            minZoom={15}
            maxZoom={19}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Buildings Markers */}
            {buildings.map(b => (
                <Marker 
                    key={b.id} 
                    position={[b.latitude, b.longitude]}
                    icon={getCategoryIcon(b.category?.slug || 'default')}
                    eventHandlers={{
                        click: () => onMarkerClick(b),
                    }}
                >
                   <Popup>{b.name}</Popup>
                </Marker>
            ))}

            {/* User Location Marker */}
            {userLocation && (
                <Marker 
                    position={userLocation} 
                    icon={new L.DivIcon({
                        className: 'user-marker',
                        html: '<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);"></div>',
                        iconSize: [12, 12]
                    })}
                >
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {/* Navigation Route */}
            {routePositions && (
               <Polyline positions={routePositions} color="blue" weight={5} opacity={0.7} />
            )}

            {/* Map Controller */}
            <MapUpdater 
                center={selectedBuilding ? [selectedBuilding.latitude, selectedBuilding.longitude] : undefined}
                bounds={routePositions ? L.latLngBounds(routePositions) : undefined}
            />
        </MapContainer>
    );
};

export default MapView;
