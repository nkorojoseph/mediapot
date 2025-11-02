'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  GiftTopIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const DEFAULT_WIDTH = 240;
  const [width, setWidth] = useState(DEFAULT_WIDTH); // default width in px
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Create Post', href: '/create-post', icon: DocumentTextIcon },
    { name: 'Content-Library', href: '/content-library', icon: ChartBarIcon },
    { name: 'Trending Topics', href: '/trending', icon: GiftTopIcon },
    { name: 'Calendar/Planner', href: '/calendar-planner', icon: CalendarDaysIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: ChartBarIcon },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX;
    if (newWidth < 400) {
      setWidth(newWidth);
      if (newWidth <= 80) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  // Attach listeners globally
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`bg-white dark:bg-gray-900 shadow-md h-full flex flex-col relative transition-all duration-200 ${
        collapsed ? 'w-16' : ''
      }`}
      style={collapsed ? { width: 64 } : { width }}
    >
      <div
        className={`p-4 font-bold flex items-center justify-between ${
          collapsed ? 'justify-center text-xs' : 'text-xl'
        }`}
      >
        {!collapsed && 'Mediapot'}
        <button
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="ml-auto bg-transparent p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => {
            if (collapsed) {
              setWidth(DEFAULT_WIDTH);
              setCollapsed(false);
            } else {
              setCollapsed(true);
            }
          }}
        >
          {collapsed ? (
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      <nav className={`mt-6 flex-1 ${collapsed ? 'flex flex-col items-center' : ''}`}>
        {links.map(({ name, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
              pathname === href
                ? 'bg-gray-200 dark:bg-gray-700 border-l-4 border-indigo-500'
                : 'text-gray-700 dark:text-gray-300'
            } ${collapsed ? 'justify-center px-2 text-xs' : ''}`}
          >
            <Icon className={`h-6 w-6 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && (
              <span className="truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                {name}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Drag handle */}
      {!collapsed && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 right-0 h-full w-1 cursor-ew-resize hover:bg-gray-400 dark:hover:bg-gray-600"
        />
      )}
    </div>
  );
}
