'use client';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function DashboardLayout({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Breadcrumb */}
        <nav className="text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 px-6 py-2 text-sm shadow-inner">
          <ol className="flex">
            <li>
              <a href="/dashboard" className="hover:underline">
                Home
              </a>
            </li>
            {pathname !== '/dashboard' && (
              <>
                <li className="mx-2">/</li>
                <li className="capitalize">{pathname.replace('/dashboard/', '')}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto text-gray-800 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>

  );
}
