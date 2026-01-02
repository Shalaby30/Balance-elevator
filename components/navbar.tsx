'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                        Elevator Balance
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            الرئيسية
                        </Link>

                        <Link
                            href="/spare-parts"
                            className="text-sm font-medium border-b-2 border-blue-600 text-gray-900 dark:text-white"
                        >
                            قطع الغيار
                        </Link>

                        <Button variant="outline">
                            اتصل بنا
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-gray-700 dark:text-gray-200"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t bg-white dark:bg-gray-900">
                    <div className="px-4 py-4 space-y-4">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="block text-gray-700 dark:text-gray-200 font-medium"
                        >
                            الرئيسية
                        </Link>

                        <Link
                            href="/spare-parts"
                            onClick={() => setOpen(false)}
                            className="block text-gray-700 dark:text-gray-200 font-medium"
                        >
                            قطع الغيار
                        </Link>

                        <Button className="w-full" variant="outline">
                            اتصل بنا
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
