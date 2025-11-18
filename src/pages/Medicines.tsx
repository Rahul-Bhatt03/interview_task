import React, { useState, useMemo } from 'react';
import { useGetMedicinesQuery } from '../features/medicines/medicineSlice';
import { MedicineTable } from '../components/table/MedicineTable';
import { MedicineFilters } from '../components/ui/MedicineFilters';
import { Pagination } from '../components/table/Pagination';
import { Pill, AlertCircle } from 'lucide-react';

export const Medicines: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: medicines = [], isLoading, isError, error } = useGetMedicinesQuery();

  // Filter medicines based on search term
  const filteredMedicines = useMemo(() => {
    if (!searchTerm.trim()) return medicines;

    const searchLower = searchTerm.toLowerCase();
    return medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine.genericName.toLowerCase().includes(searchLower) ||
        medicine.category.toLowerCase().includes(searchLower) ||
        medicine.manufacturer.toLowerCase().includes(searchLower)
    );
  }, [medicines, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">Error Loading Medicines</h3>
              <p className="text-red-700">
                {error && 'status' in error
                  ? `Error: ${error.status}`
                  : 'An error occurred while fetching medicines. Please try again later.'}
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
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medicine Inventory</h1>
              <p className="text-gray-600 mt-1">
                Manage and view all available medicines
              </p>
            </div>
          </div>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Total Medicines</div>
            <div className="text-2xl font-bold text-gray-900">{medicines.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Filtered Results</div>
            <div className="text-2xl font-bold text-blue-600">{filteredMedicines.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Current Page</div>
            <div className="text-2xl font-bold text-purple-600">{currentPage} / {totalPages || 1}</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Prescription Required</div>
            <div className="text-2xl font-bold text-red-600">
              {medicines.filter(m => m.requiresPrescription).length}
            </div>
          </div>
        </div>

    
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6">
          <MedicineFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <MedicineTable medicines={[]} isLoading={true} />
          ) : filteredMedicines.length === 0 ? (
            <div className="p-12 text-center">
              <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Medicines Found</h3>
              <p className="text-gray-600">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'No medicines available in the inventory'}
              </p>
            </div>
          ) : (
            <>
              <MedicineTable medicines={currentMedicines} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredMedicines.length}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};