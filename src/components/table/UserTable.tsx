import React from 'react';
import type{ User } from '../../features/types';
import { User as UserIcon, Mail, Phone, Globe, MapPin, Building2 } from 'lucide-react';

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ users, isLoading }) => {
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
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Website
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">@{user.username}</div>
                    <div className="text-xs text-gray-400 mt-1">ID: {user.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`mailto:${user.email}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`tel:${user.phone}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {user.phone}
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-900">
                    <div>{user.address.street}, {user.address.suite}</div>
                    <div className="text-gray-600">
                      {user.address.city}, {user.address.zipcode}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.company.name}</div>
                    <div className="text-xs text-gray-600 mt-1 italic">
                      "{user.company.catchPhrase}"
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{user.company.bs}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {user.website}
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};