'use client';

import { useState, useEffect, useMemo } from 'react';
import { getCategories, getBuildings, getCampusBoundary, getRoute } from '@/lib/api';
import { Category, Building, CampusBoundary } from '@/types';
import MapWrapper from '@/components/Map/MapWrapper';
import FilterBar from '@/components/Sidebar/FilterBar';
import SearchBox from '@/components/Sidebar/SearchBox';
import BuildingList from '@/components/Sidebar/BuildingList';
import BuildingDetails from '@/components/UI/BuildingDetails';

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [allBuildings, setAllBuildings] = useState<Building[]>([]);
    const [boundary, setBoundary] = useState<CampusBoundary | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [routeGeometry, setRouteGeometry] = useState<any | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats, blds, bound] = await Promise.all([
                    getCategories(),
                    getBuildings(),
                    getCampusBoundary()
                ]);
                setCategories(cats);
                setAllBuildings(blds);
                setBoundary(bound);
            } catch (err) {
                console.error("Failed to load initial data", err);
            }
        };

        fetchData();

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
                (err) => console.warn("Geolocation denied", err)
            );
        }
    }, []);

    const filteredBuildings = useMemo(() => {
        return allBuildings.filter(b => {
             const matchesCategory = selectedCategory ? b.category?.slug === selectedCategory : true;
             const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
             return matchesCategory && matchesSearch;
        });
    }, [allBuildings, selectedCategory, searchQuery]);

    const handleBuildingSelect = (b: Building) => {
        setSelectedBuilding(b);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const handleNavigate = async () => {
        if (!userLocation || !selectedBuilding) {
            alert("Location unavailable. Please enable GPS.");
            return;
        }

        setIsNavigating(true);
        try {
            const data = await getRoute(userLocation, [selectedBuilding.latitude, selectedBuilding.longitude]);
            if (data.routes && data.routes.length > 0) {
                setRouteGeometry(data.routes[0].geometry);
            } else {
                alert("No route found.");
            }
        } catch (error) {
            console.error("Navigation error", error);
            alert("Failed to calculate route.");
        } finally {
            setIsNavigating(false);
        }
    };

    return (
        <main className="flex h-screen w-screen overflow-hidden bg-gray-100 font-sans">
            <div className={`
                fixed inset-y-0 left-0 z-20 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
            `}>
                <div className="p-4 bg-blue-900 text-white flex justify-between items-center shrink-0">
                    <div>
                        <h1 className="font-bold text-lg">MWU Navigator</h1>
                        <p className="text-xs text-blue-200">Smart Campus System</p>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden p-1 bg-blue-800 rounded"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <SearchBox value={searchQuery} onChange={setSearchQuery} />
                <FilterBar 
                    categories={categories} 
                    selectedCategory={selectedCategory} 
                    onSelect={setSelectedCategory} 
                />
                <BuildingList 
                    buildings={filteredBuildings} 
                    onSelect={handleBuildingSelect} 
                />
            </div>

            <div className="flex-1 relative h-full">
                {!isSidebarOpen && (
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="absolute top-4 left-4 z-10 p-3 bg-white shadow-md rounded-full text-blue-900 md:hidden"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                )}

                <MapWrapper 
                    boundary={boundary}
                    buildings={filteredBuildings} 
                    selectedBuilding={selectedBuilding}
                    routeGeometry={routeGeometry}
                    userLocation={userLocation}
                    onMarkerClick={handleBuildingSelect}
                />

                {selectedBuilding && (
                    <BuildingDetails 
                        building={selectedBuilding} 
                        onClose={() => setSelectedBuilding(null)}
                        onNavigate={handleNavigate}
                        isNavigating={isNavigating}
                    />
                )}
            </div>
        </main>
    );
}
