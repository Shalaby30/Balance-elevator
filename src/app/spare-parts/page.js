"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SpareParts() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const spareParts = [
    { id: 1, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 2, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 3, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 4, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 5, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 6, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 7, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 8, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
    { id: 9, name: "مجموعة الكابلات", desc: "أفضل أنواع الكابلات للمصاعد والسلالم الكهربائية المخصصة للمصاعد" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative  bg-gray-900">
        <div className="absolute inset-0">
          <div className="bg-gray-800 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />
          </div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed">
              قطع الغيار
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              نوفر قطع غيار أصلية من كبرى الشركات العالمية مع ضمان شامل على جميع القطع
            </p>
          </div>
        </div>
      </section>

      {/* Spare Parts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spareParts.map((part, idx) => (
              <div 
                key={part.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                {/* Image Placeholder */}
                <div className="bg-gray-300 aspect-[4/3] flex items-center justify-center">
                  <span className="text-gray-500 font-medium">صورة معتمدة</span>
                </div>

                {/* Content */}
                <div className="p-6 text-right">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <span className="inline-block ml-2">
                      <svg className="w-5 h-5 text-yellow-700 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    {part.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {part.desc}
                  </p>

                  {/* Date and Links */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                    <span>تاريخ النشر: 20 يناير 2025</span>
                    <div className="flex gap-3">
                      <a href="#" className="text-yellow-700 hover:underline font-medium">قراءة المزيد</a>
                    </div>
                  </div>

                  {/* Order Button */}
                  <button className="w-full mt-4 bg-yellow-700 hover:bg-yellow-800 text-white py-2 rounded-lg font-medium transition text-sm">
                    اطلب الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
