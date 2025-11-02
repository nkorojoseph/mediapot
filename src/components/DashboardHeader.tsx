'use client';
import { useState, useEffect } from 'react';
import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ModeToggle from './ModeToggle';

export default function DashboardHeader() {
  return (
    <div>
      <header className="flex items-center justify-between bg-white dark:bg-gray-900 px-6 py-3 shadow">
        {/* LEFT: Search */}
        <div>
          <input
            type="text"
            placeholder="Search…"
            className="border rounded-lg px-3 py-1 w-64
                     focus:outline-none focus:ring focus:ring-indigo-200
                     dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
          />
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton userProfileUrl="/user-profile" />
            <ModeToggle />
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
