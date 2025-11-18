import {  Home, Users, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SideBarProps{
    isMobileOpen:boolean;
    setIsMobileOpen:(open:boolean)=>void;
}

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }: SideBarProps) => {
  const location = useLocation();

    const navItems = [
    { id: 'Products', label: 'Products', icon: Home, path: '/' },
    { id: 'users', label: 'Users', icon: Users, path: '/users' },
     { id: 'medicines', label: 'Medicines', icon:Home, path: '/medicines' },
  ];

  return(
    <>
    {isMobileOpen&&(
        <div className='fixed inset-0 bg-black/50 z-40 lg:hidden'
        onClick={()=>setIsMobileOpen(false)}
        />
    )}

    <aside
     className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 lg:w-[10%] min-w-[200px] lg:min-w-0
          bg-gradient-to-b from-slate-900 to-slate-800
          border-r border-slate-700
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            <div className='flex flex-col h-full'>
               <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-white font-semibold text-lg lg:hidden xl:inline">
                App
              </span>
            </div>
            <button onClick={()=>setIsMobileOpen(false)}
            className='lg:hidden text-slate-400 hover:text-white'
            >
                <X size={24}/>
            </button>
            </div>

            {/* navigation */}
               <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium lg:hidden xl:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

           {/* User Profile */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">RB</span>
              </div>
              <div className="lg:hidden xl:block">
                <p className="text-white text-sm font-medium">Rahul Bhatt</p>
                <p className="text-slate-400 text-xs">rahul@gmail.com</p>
              </div>
            </div>
          </div>

            </div>
        </aside>
    </>
  )
}