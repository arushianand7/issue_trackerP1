'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  ListTodo, 
  BarChart3, 
  Menu, 
  X 
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Task Status', href: '/', icon: CheckCircle2 },
  { label: 'Calendar & Goals', href: '/calendar-goals', icon: CalendarIcon },
  { label: 'Daily Tasks', href: '/daily-tasks', icon: ListTodo },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold text-base">
              G
            </div>
            <span className="font-semibold text-zinc-900 tracking-tight text-lg">FocusTrack</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-zinc-900 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}