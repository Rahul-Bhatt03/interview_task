import React from 'react';
import type{ Medicine } from '../../features/types';
import { Pill, Package, DollarSign, Calendar, AlertCircle } from 'lucide-react';

interface MedicineTableProps {
  medicines: Medicine[];
  isLoading?: boolean;
}

export const MedicineTable: React.FC<MedicineTableProps> = ({ medicines, isLoading }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-200 p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
              Medicine
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Form
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prescription
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {medicines.map((medicine) => (
            <tr key={medicine._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                    <div className="text-xs text-gray-500">{medicine.genericName}</div>
                    <div className="text-xs text-gray-400 mt-1">{medicine.manufacturer}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {medicine.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {medicine.form}
                </div>
                <div className="text-xs text-gray-400 mt-1">{medicine.dosage}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  {formatPrice(medicine.price)}
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    medicine.stock > 50
                      ? 'bg-green-100 text-green-800'
                      : medicine.stock > 20
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {medicine.stock} units
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span
                    className={`${
                      isExpired(medicine.expiryDate)
                        ? 'text-red-600 font-medium'
                        : isExpiringSoon(medicine.expiryDate)
                        ? 'text-yellow-600 font-medium'
                        : 'text-gray-900'
                    }`}
                  >
                    {formatDate(medicine.expiryDate)}
                  </span>
                </div>
                {isExpired(medicine.expiryDate) && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                    <AlertCircle className="w-3 h-3" />
                    Expired
                  </div>
                )}
                {isExpiringSoon(medicine.expiryDate) && !isExpired(medicine.expiryDate) && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-yellow-600">
                    <AlertCircle className="w-3 h-3" />
                    Expiring Soon
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    medicine.requiresPrescription
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {medicine.requiresPrescription ? 'Required' : 'Not Required'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};