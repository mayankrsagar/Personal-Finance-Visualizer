'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/chart', label: 'BarChart Representation' },
    {href:"/dashboard", label:"Dashboard"},
    {href:"/monthlyBudget",label:"Monthly Budget"},
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link className="text-lg font-bold text-indigo-600" href={"/"}>Personal</Link>

        <ul className="flex items-center gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium hover:text-indigo-600 transition-colors',
                  pathname === link.href ? 'text-indigo-600' : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
