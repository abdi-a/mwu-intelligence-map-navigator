'use client';

import { Building } from '@/types';

interface BuildingListProps {
    buildings: Building[];
    onSelect: (b: Building) => void;
}

const BuildingList = ({ buildings, onSelect }: BuildingListProps) => {
    if (buildings.length === 0) {
        return <div className="p-8 text-center text-gray-500">No buildings found.</div>;
    }

    return (
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {buildings.map((b) => (
                <div 
                    key={b.id}
                    onClick={() => onSelect(b)}
                    className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer border border-transparent hover:border-blue-300 transition-all"
                >
                    <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        {b.image_url ? (
                            <img src={b.image_url} alt={b.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">N/A</div>
                        )}
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-semibold text-gray-900">{b.name}</h3>
                        <p className="text-xs text-gray-500">{b.category?.name || 'Building'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BuildingList;
