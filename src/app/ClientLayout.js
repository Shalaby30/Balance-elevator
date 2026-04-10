"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من نحن" },
    { href: "/services", label: "خدماتنا" },
    ];

  const ctaButtons = [
    { href: "/spare-parts", label: "قطع الغيار", variant: "outline" },
    { href: "/contact", label: "تواصل معنا", variant: "primary" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Main Navbar - Flex on mobile, Grid on desktop */}
          <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-normal h-16">
            {/* Left: Logo */}
            <div className="flex items-center justify-start">
              <Link href="/" className="text-xl md:text-2xl font-bold text-black hover:text-gray-700 transition">
                بالانس
              </Link>
            </div>

            {/* Center: Navigation Links (Desktop only) */}
            <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
              {navLinks.slice(0, 4).map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 text-sm lg:text-base whitespace-nowrap after:absolute after:bottom-0 after:right-0 after:h-0.5 after:transition-all after:duration-300 ${
                      active
                        ? "text-black font-semibold after:w-full after:bg-yellow-700"
                        : "text-gray-700 hover:text-black after:w-0 after:bg-black hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: CTA Buttons (desktop) / Hamburger (mobile) */}
            <div className="flex items-center justify-end gap-3">
              <div className="hidden md:flex items-center gap-3">
                {ctaButtons.map((btn) => (
                  <Link
                    key={btn.href}
                    href={btn.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      btn.variant === "primary"
                        ? "bg-yellow-700 text-white hover:bg-yellow-800"
                        : "border-2 border-gray-300 text-gray-700 hover:border-yellow-700 hover:text-yellow-700"
                    }`}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 -mr-2"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown - Outside Grid */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg transition ${
                        active
                          ? "bg-yellow-50 text-yellow-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="border-t border-gray-100 my-2 pt-2 flex flex-col gap-2">
                  {ctaButtons.map((btn) => (
                    <Link
                      key={btn.href}
                      href={btn.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mx-4 py-3 rounded-lg text-center font-medium transition ${
                        btn.variant === "primary"
                          ? "bg-yellow-700 text-white hover:bg-yellow-800"
                          : "border-2 border-gray-300 text-gray-700 hover:border-yellow-700"
                      }`}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white">بالانس</h3>
              <p className="mt-4 text-gray-400">
                شركة رائدة في مجال المصاعد والسلالم الكهربائية والمماشي المتحركة.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">الرئيسية</Link></li>
                <li><Link href="/about" className="hover:text-white">من نحن</Link></li>
                <li><Link href="/services" className="hover:text-white">خدماتنا</Link></li>
                <li><Link href="/contact" className="hover:text-white">تواصل معنا</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li>تركيب المصاعد</li>
                <li>صيانة المصاعد</li>
                <li><Link href="/spare-parts" className="hover:text-white">قطع الغيار</Link></li>
                <li>تحديث المصاعد</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <p className="text-gray-400">info@balance.com</p>
              <p className="text-gray-400 mt-2">01014466479</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
