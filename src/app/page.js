"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
    
    // Simulate loading completion
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `الموقع: ${formData.location}\nالخدمة: ${formData.service}\nملاحظات: ${formData.notes}`,
          type: "inspection"
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", phone: "", email: "", location: "", service: "", notes: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(data.error || "حدث خطأ أثناء الإرسال");
      }
    } catch (err) {
      setSubmitError("خطأ في الاتصال بالخادم");
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    { icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>, title: "تركيب المصاعد", desc: "نقدم خدمات تركيب المصاعد بأعلى معايير الجودة والسلامة، مع ضمان شامل على جميع أعمال التركيب" },
    { icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, title: "صيانة المصاعد", desc: "خدمات صيانة دورية وشاملة لضمان أداء مثالي طوال الوقت، مع فريق فني متخصص ومتاح على مدار الساعة" },
    { icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>, title: "قطع الغيار", desc: "نوفر قطع غيار أصلية من كبرى الشركات العالمية مع ضمان شامل على جميع القطع المستبدلة" },
    { icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, title: "استشارات فنية", desc: "استشارات متخصصة لاختيار الحل الأمثل لاحتياجاتك من قبل مهندسين ذوي خبرة وكفاءة عالية" },
    { icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, title: "إنشاء وتوريد المصاعد", desc: "نقدم حلولاً متكاملة لإنشاء وتوريد المصاعد للمباني السكنية والتجارية والفندقية" },
    { icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>, title: "تحديث وتطوير المصاعد", desc: "خدمات تحديث وتطوير المصاعد القديمة لتتوافق مع أحدث المعايير الدولية والتقنيات الحديثة" },
  ];

  const projects = [
    { img: "/elevator1.jpg", title: "فندق النيل" },
    { img: "/elevator2.jpg", title: "برج الأعمال" },
    { img: "/elevator3.jpg", title: "مركز تسوق الواحة" },
    { img: "/elevator4.jpg", title: "مجمع سكني الفيصلية" },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/Hero-preload.jpg"
            className="h-full w-full object-cover"
            src="/Hero.mp4"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                حلول المصاعد المتطورة تخدم المستقبل
              </h1>
              <p className="mt-6 text-lg text-white/80">
                نقدم حلولاً متكاملة للمصاعد والسلالم الكهربائية والمماشي المتحركة بأعلى معايير الجودة والسلامة
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  اكتشف المزيد
                </button>
                <button className="border-2 border-white text-white hover:bg-white/20 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  تواصل معنا
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative" data-aos="fade-left">
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="bg-gray-200 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <img src="/elevator-maintain.jpg" alt="About Us" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-black text-white p-4 rounded-lg">
                <p className="text-3xl font-bold">+15</p>
                <p className="text-sm">سنوات خبرة</p>
              </div>
            </div>
            <div data-aos="fade-right">
              <span className="text-gray-500 font-semibold">من نحن</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                نحن نقدم للمصاعد والسلالم الكهربائية
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                شركة بالانس رائدة في مجال المصاعد والسلالم الكهربائية والمماشي المتحركة. نقدم حلولاً متكاملة تشمل التركيب والصيانة وقطع الغيار بأعلى معايير الجودة والسلامة.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                ن��مل مع كبرى الشركات والفنادق والمولات التجارية لتقديم أفضل الخدمات بأيدي فريق متخصص ذو خبرة عالية في هذا المجال.
              </p>
              <button className="mt-6 text-black font-semibold hover:text-yellow-700 transition-colors duration-300 inline-flex items-center gap-2 group">
                اقرأ المزيد 
                <span className="transform transition-transform group-hover:translate-x-1">←</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gray-500 font-semibold">خدماتنا</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              خدماتنا على مستوى عالمي
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة متكاملة من الخدمات لتلبية جميع احتياجاتك في مجال المصاعد والسلالم الكهربائية
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="relative mt-8 group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 transition-transform group-hover:scale-110 duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl">
                    {service.icon}  
                  </div>
                </div>
                <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-xl pt-12 pb-8 px-8 text-center hover:shadow-2xl transition-all duration-300 border border-stone-200 hover:border-yellow-700/50 group-hover:-translate-y-2">
                  <h3 className="text-lg font-bold text-gray-900 mt-2 border-b-2 border-yellow-700 inline-block pb-1">{service.title}</h3>
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              جميع الخدمات
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gray-500 font-semibold">أعمالنا</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              حلول المصاعد وسلالم كهربائية لعملائنا وكبيرة عالمية
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-left">
              <span className="text-gray-500 font-semibold">لماذا نحن؟</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                لماذا تختار بالانس؟
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  "فريق فني متخصص ومعتمد",
                  "قطع غيار أصلية 100%",
                  "ضمان شامل على جميع الخدمات",
                  "خدمة عملاء 24/7",
                  "أسعار تنافسية وشفافة",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-right">
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="bg-gray-200 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <img src="/elevator-install.jpg" alt="Why Choose Us" className="w-full h-full object-cover rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Inspection Request Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-100 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-b-2 border-yellow-700 inline-block pb-2">
                طلب معاينة أو زيارة
              </h2>
              <p className="mt-3 text-gray-600">
                املأ النموذج التالي وسنقوم بالتواصل معك لتحديد موعد المعاينة
              </p>
            </div>
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                ✓ شكراً لك! تم استقبال طلب المعاينة بنجاح. سيتواصل معك فريقنا قريباً.
              </div>
            )}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
                ✗ {submitError}
              </div>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="الاسم الكامل" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-yellow-700 focus:outline-none bg-white text-black transition-colors duration-200" 
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="رقم الجوال" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-yellow-700 focus:outline-none bg-white text-black transition-colors duration-200" 
                  required
                />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="البريد الإلكتروني" 
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-yellow-700 focus:outline-none bg-white text-black transition-colors duration-200" 
                required
              />
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                placeholder="العنوان / الموقع" 
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-yellow-700 focus:outline-none bg-white text-black transition-colors duration-200" 
              />
              <select 
                name="service"
                value={formData.service}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-yellow-700 focus:outline-none bg-white text-black transition-colors duration-200"
              >
                <option value="">نوع الخدمة المطلوبة</option>
                <option value="install">تركيب مصعد جديد</option>
                <option value="maintain">صيانة دورية</option>
                <option value="repair">إصلاح عطل</option>
                <option value="consult">استشارة فنية</option>
              </select>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                rows="4" 
                placeholder="ملاحظات إضافية (اختياري)" 
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-yellow-700 focus:outline-none bg-white text-black transition-colors duration-200 resize-none"
              ></textarea>
              <button 
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg text-lg ${
                  submitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-800 hover:to-yellow-700 text-white transform hover:scale-105"
                }`}
              >
                {submitting ? "جاري الإرسال..." : "إرسال طلب المعاينة"}
              </button>
            </form>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
