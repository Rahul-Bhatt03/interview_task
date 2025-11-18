import React from 'react';
import type{ Product } from '../../features/types';
import { DollarSign, Star, Tag, ShoppingCart } from 'lucide-react';

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, isLoading }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "men's clothing": 'bg-blue-100 text-blue-800',
      "women's clothing": 'bg-pink-100 text-pink-800',
      'jewelery': 'bg-purple-100 text-purple-800',
      'electronics': 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 line-clamp-2">
                      {product.title}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Tag className="w-3 h-3" />
                      ID: {product.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getCategoryColor(
                    product.category
                  )}`}
                >
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {product.rating.rate.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ShoppingCart className="w-3 h-3" />
                    {product.rating.count} reviews
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 max-w-md">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};