"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "contact"
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || "حدث خطأ أثناء الإرسال");
      }
    } catch (err) {
      setError("خطأ في الاتصال بالخادم");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">


      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">


            {/* Info Side */}
            <div data-aos="fade-left" className="text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-6">
                تواصل معنا اليوم للحصول
                على أفضل حلول المصاعد
                والسلالم الكهربائية
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                نحن في خدمتك على مدار الساعة. سواء كنت بحاجة إلى استشارة مجانية أو عرض سعر لمشروعك، فريقنا جاهز لمساعدتك في كل خطوة.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-700/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">البريد الإلكتروني</p>
                    <p className="text-gray-600">info@balance.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-700/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">رقم الهاتف</p>
                    <p className="text-gray-600">01014466479</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-700/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">الموقع</p>
                    <p className="text-gray-600">سيدي بشر – 100م متفرع من حسن رفعت خلف الأمن المركزي – برج اللؤلؤة</p>
                  </div>
                </div>
              </div>
            </div>

                        {/* Form Side */}
            <div data-aos="fade-left">
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                  ✓ شكراً لك! تم استقبال طلبك بنجاح. سيتواصل معك فريقنا قريباً.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                  ✗ {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-700 focus:border-transparent outline-none text-black"
                      placeholder="أدخل اسمك"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-700 focus:border-transparent outline-none text-black"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-700 focus:border-transparent outline-none text-black"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-700 focus:border-transparent outline-none text-black resize-none"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-lg font-semibold transition text-lg ${
                    loading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-800 hover:to-yellow-700 text-white"
                  }`}
                >
                  {loading ? "جارٍ الإرسال..." : "إرسال"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl overflow-visible relative mt-16">
            <div className="grid grid-cols-2 items-end">
              {/* Text Side */}
              <div className="p-4 md:p-8 text-right">
                <h2 className="text-sm md:text-2xl font-bold text-white leading-relaxed">
                  ننتظر تواصلك معنا
                </h2>
                <p className="mt-2 md:mt-3 text-blue-100 text-xs md:text-sm leading-relaxed hidden md:block">
                  فريقنا جاهز للإجابة على جميع استفساراتك
                </p>
                <div className="mt-3 md:mt-4">
                  <Link href="/services" className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium transition text-xs md:text-sm">
                    اكتشف خدماتنا
                  </Link>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative h-32 md:h-80 -mt-8 md:-mt-16 flex items-start justify-center">
                <img 
                  src="/Contact.png" 
                  alt="فني بالانس" 
                  className="h-full w-auto object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
