import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './SideBar';
import { Menu } from 'lucide-react';

export const Layout = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

            <main className="flex-1 overflow-y-auto">
                
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="text-slate-600 hover:text-slate-800"
                    >
                        <Menu size={24} />
                    </button>
                    <h2 className="font-semibold text-slate-800">Dashboard</h2>
                    <div className="w-6" />
                </div>

                {/* Content Area */}
                <div className="p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

