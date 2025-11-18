import React, { useState, useMemo } from 'react';
import { useGetProductsQuery } from '../features/products/productSlice';
import { ProductTable } from '../components/table/ProductTable';
import { ProductFilters } from '../components/ui/ProductFilters';
import { Pagination } from '../components/table/Pagination';
import { Package, AlertCircle, Star, DollarSign } from 'lucide-react';

export const Products: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    const { data: products = [], isLoading, isError, error } = useGetProductsQuery();

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
        return uniqueCategories.sort();
    }, [products]);

    const maxPrice = useMemo(() => {
        if (products.length === 0) return 1000;
        return Math.ceil(Math.max(...products.map((p) => p.price)));
    }, [products]);

    React.useEffect(() => {
        if (products.length > 0 && priceRange[1] === 1000) {
            setPriceRange([0, maxPrice]);
        }
    }, [maxPrice, products.length]);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Search filter
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower) ||
                    product.category.toLowerCase().includes(searchLower)
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        filtered = filtered.filter(
            (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filtered.sort((a, b) => b.rating.rate - a.rating.rate);
                break;
            case 'rating-asc':
                filtered.sort((a, b) => a.rating.rate - b.rating.rate);
                break;
            case 'title-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }

        return filtered;
    }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

    // Pagination logic
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage, selectedCategory, sortBy, priceRange]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // stats calculation logic
    const averagePrice = useMemo(() => {
        if (filteredAndSortedProducts.length === 0) return 0;
        const total = filteredAndSortedProducts.reduce((sum, p) => sum + p.price, 0);
        return total / filteredAndSortedProducts.length;
    }, [filteredAndSortedProducts]);

    const averageRating = useMemo(() => {
        if (filteredAndSortedProducts.length === 0) return 0;
        const total = filteredAndSortedProducts.reduce((sum, p) => sum + p.rating.rate, 0);
        return total / filteredAndSortedProducts.length;
    }, [filteredAndSortedProducts]);

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-900 mb-1">Error Loading Products</h3>
                            <p className="text-red-700">
                                {error && 'status' in error
                                    ? `Error: ${error.status}`
                                    : 'An error occurred while fetching products. Please try again later.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
                            <p className="text-gray-600 mt-1">Browse and manage all available products</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Total Products</div>
                                <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Filtered Results</div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {filteredAndSortedProducts.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Star className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Avg Rating</div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {averageRating.toFixed(1)} / 5
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Avg Price</div>
                                <div className="text-2xl font-bold text-purple-600">
                                    ${averagePrice.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6">
                    <ProductFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={categories}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        maxPrice={maxPrice}
                    />
                </div>


                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {isLoading ? (
                        <ProductTable products={[]} isLoading={true} />
                    ) : filteredAndSortedProducts.length === 0 ? (
                        <div className="p-12 text-center">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
                            <p className="text-gray-600">
                                {searchTerm || selectedCategory !== 'all' || priceRange[1] < maxPrice
                                    ? 'Try adjusting your filters'
                                    : 'No products available in the catalog'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <ProductTable products={currentProducts} />
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={filteredAndSortedProducts.length}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};