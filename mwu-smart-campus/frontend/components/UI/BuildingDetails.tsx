'use client';

import { Building } from '@/types';

interface BuildingDetailsProps {
    building: Building;
    onClose: () => void;
    onNavigate: () => void;
    isNavigating: boolean;
}

const BuildingDetails = ({ building, onClose, onNavigate, isNavigating }: BuildingDetailsProps) => {
    return (
        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-2xl z-[1000] overflow-hidden flex flex-col max-h-[80vh]">
            <div className="relative h-48 bg-gray-200">
                {building.image_url && (
                    <img src={building.image_url} alt={building.name} className="w-full h-full object-cover" />
                )}
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full mb-2">
                            {building.category?.name}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900">{building.name}</h2>
                    </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {building.description || "No description available for this building."}
                </p>

                <button
                    onClick={onNavigate}
                    disabled={isNavigating}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                    {isNavigating ? 'Calculating Route...' : 'Navigate Here'}
                    {!isNavigating && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BuildingDetails;
