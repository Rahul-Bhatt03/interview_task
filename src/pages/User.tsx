import React, { useState, useMemo } from 'react';
import { useGetUsersQuery } from '../features/users/userSlice';
import { UserTable } from '../components/table/UserTable';
import { UserFilters } from '../components/ui/UserFilters';
import { Pagination } from '../components/table/Pagination';
import { Users as UsersIcon, AlertCircle, Building2, MapPin } from 'lucide-react';

export const Users: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], isLoading, isError, error } = useGetUsersQuery();

    const filteredUsers = useMemo(() => {
        if (!searchTerm.trim()) return users;

        const searchLower = searchTerm.toLowerCase();
        return users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchLower) ||
                user.username.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.company.name.toLowerCase().includes(searchLower) ||
                user.address.city.toLowerCase().includes(searchLower) ||
                user.phone.includes(searchTerm)
        );
    }, [users, searchTerm]);

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to page 1 when search term or items per page changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    //   stats calculation logic 
    const totalCompanies = useMemo(() => {
        const uniqueCompanies = new Set(users.map(user => user.company.name));
        return uniqueCompanies.size;
    }, [users]);

    const totalCities = useMemo(() => {
        const uniqueCities = new Set(users.map(user => user.address.city));
        return uniqueCities.size;
    }, [users]);

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-900 mb-1">Error Loading Users</h3>
                            <p className="text-red-700">
                                {error && 'status' in error
                                    ? `Error: ${error.status}`
                                    : 'An error occurred while fetching users. Please try again later.'}
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
                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                            <p className="text-gray-600 mt-1">
                                View and manage all registered users
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <UsersIcon className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Total Users</div>
                                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <UsersIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Filtered Results</div>
                                <div className="text-2xl font-bold text-blue-600">{filteredUsers.length}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Companies</div>
                                <div className="text-2xl font-bold text-green-600">{totalCompanies}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Cities</div>
                                <div className="text-2xl font-bold text-orange-600">{totalCities}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6">
                    <UserFilters
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={setItemsPerPage}
                    />
                </div>


                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {isLoading ? (
                        <UserTable users={[]} isLoading={true} />
                    ) : filteredUsers.length === 0 ? (
                        <div className="p-12 text-center">
                            <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
                            <p className="text-gray-600">
                                {searchTerm
                                    ? 'Try adjusting your search terms'
                                    : 'No users available in the system'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <UserTable users={currentUsers} />
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={filteredUsers.length}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};