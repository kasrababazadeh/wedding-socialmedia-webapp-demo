'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  const { user, logout } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu: () => void = () => setMenuOpen(prev => !prev);

  return (
    <nav className="bg-white min-h-[10vh] dark:bg-gray-900 dark:text-white shadow fixed w-full top-0 right-0 z-40 transition-colors duration-300">
      <div className="mx-auto flex justify-between items-center lg:px-20">
        {/* Left - Primary Links */}
        <div className="flex items-center">
          <Link href="/" className="h-full w-20 flex items-center justify-center hover:bg-sky-600 transition-colors duration-200">
            خانه
          </Link>
          <Link href="/couples" className="h-full w-20 flex items-center justify-center hover:bg-sky-600 transition-colors duration-200">
            زوج‌ها
          </Link>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          <Link href="/">لوگو</Link>
        </div>

        {/* Right - Theme Toggle & Menu Icon */}
        <div className="flex">
          <div className="flex items-center justify-center h-20 w-20">
            <DarkModeToggle />
          </div>
          
          <button onClick={toggleMenu} className="flex items-center justify-center text-2xl h-20 w-20">
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Side Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 dark:text-white shadow-lg p-6 flex flex-col gap-4 z-50 transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">منو</h2>
            <button onClick={toggleMenu}>
              <FiX className="text-2xl" />
            </button>
          </div>

          <Link href="/about">
            <div onClick={() => setMenuOpen(false)} className="hover:text-blue-600 cursor-pointer">
              درباره ما
            </div>
          </Link>
          <Link href="/couples/register">
            <div onClick={() => setMenuOpen(false)} className="hover:text-blue-600 cursor-pointer">
              ثبت نام
            </div>
          </Link>
          <Link href="/my-donations">
            <div onClick={() => setMenuOpen(false)} className="hover:text-blue-600 cursor-pointer">
              کمک‌های من
            </div>
          </Link>

          {user ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="hover:text-red-500 text-right"
            >
              خروج
            </button>
          ) : (
            <Link href="/login">
              <div onClick={() => setMenuOpen(false)} className="hover:text-blue-600 cursor-pointer">
                ورود
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
