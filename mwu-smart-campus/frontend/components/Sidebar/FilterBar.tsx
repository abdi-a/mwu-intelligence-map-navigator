'use client';

import { Category } from '@/types';

interface FilterBarProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelect: (slug: string | null) => void;
}

const FilterBar = ({ categories, selectedCategory, onSelect }: FilterBarProps) => {
    return (
        <div className="flex gap-2 overflow-x-auto p-4 bg-white shadow-sm border-b no-scrollbar">
            <button
                onClick={() => onSelect(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === null 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(selectedCategory === cat.slug ? null : cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat.slug 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
