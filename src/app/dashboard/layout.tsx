'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  Store,
  Puzzle,
  Bell,
  Download,
  User,
  HelpCircle,
  UserCircle,
  ChevronDown,
} from 'lucide-react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') ?? false;

  return (
    <html lang="en">
      <body className="bg-[#0d0d11] text-white min-h-screen">
        {/* Custom Dashboard Topbar */}
        {isDashboard ? (
          <div className="bg-[#0bb4d8] text-black px-4 py-2 flex items-center justify-between shadow-md rounded-tl-[10px] rounded-tr-[10px]">
            {/* Left side */}
            
              <div className="flex items-center bg-black/10 rounded px-2 py-1">
                <span className="mr-1">Workspaces</span>
                <ChevronDown size={14} />
              </div>
            

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              <Store className="cursor-pointer" size={18} />
              <Puzzle className="cursor-pointer" size={18} />
              <Bell className="cursor-pointer" size={18} />
              <Download className="cursor-pointer" size={18} />
              <User className="cursor-pointer" size={18} />
              <HelpCircle className="cursor-pointer" size={18} />
              <UserCircle className="cursor-pointer" size={20} />
            </div>
          </div>
        ) : (
          // Default Navbar for non-dashboard routes
          <div className="bg-gray-900 px-4 py-2 text-white">
            Default Navbar
          </div>
        )}

        {/* Page content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
