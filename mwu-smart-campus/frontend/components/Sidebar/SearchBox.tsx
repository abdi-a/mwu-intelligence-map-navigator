'use client';

interface SearchBoxProps {
    value: string;
    onChange: (val: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
    return (
        <div className="p-4 bg-white border-b">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search buildings..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
    );
};

export default SearchBox;
