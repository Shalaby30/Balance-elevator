"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "من نحن" },
    { href: "/services", label: "خدماتنا" },
    { href: "/spare-parts", label: "قطع الغيار" },
    { href: "/contact", label: "تواصل معنا" },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-2xl font-bold text-black hover:text-gray-700 transition">
                بالانس
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 after:absolute after:bottom-0 after:right-0 after:h-0.5 after:transition-all after:duration-300 ${
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
          </div>
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
                <li>قطع الغيار</li>
                <li>تحديث المصاعد</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <p className="text-gray-400">info@balance.com</p>
              <p className="text-gray-400 mt-2">+20123456789</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
