import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface ProductFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    categories: string[];
    sortBy: string;
    onSortChange: (value: string) => void;
    priceRange: [number, number];
    onPriceRangeChange: (value: [number, number]) => void;
    maxPrice: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
    searchTerm,
    onSearchChange,
    itemsPerPage,
    onItemsPerPageChange,
    selectedCategory,
    onCategoryChange,
    categories,
    sortBy,
    onSortChange,
    priceRange,
    onPriceRangeChange,
    maxPrice,
}) => {
    return (
        <div className="space-y-4">

            {/*  search & items perpage logic  */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products by title or description..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                    >
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                    </select>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer capitalize"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category} className="capitalize">
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Rating: High to Low</option>
                        <option value="rating-asc">Rating: Low to High</option>
                        <option value="title-asc">Title: A to Z</option>
                        <option value="title-desc">Title: Z to A</option>
                    </select>
                </div>


                {/* for price range  */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) =>
                                onPriceRangeChange([priceRange[0], Number(e.target.value)])
                            }
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'all' || sortBy !== 'default' || priceRange[1] < maxPrice) && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                    {selectedCategory !== 'all' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {selectedCategory}
                            <button
                                onClick={() => onCategoryChange('all')}
                                className="ml-2 hover:text-blue-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {sortBy !== 'default' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {sortBy.replace('-', ': ')}
                            <button
                                onClick={() => onSortChange('default')}
                                className="ml-2 hover:text-purple-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {priceRange[1] < maxPrice && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Under ${priceRange[1]}
                            <button
                                onClick={() => onPriceRangeChange([0, maxPrice])}
                                className="ml-2 hover:text-green-900"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};