"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const features = [
    {
      icon: <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: "الجودة",
      desc: "نلتزم بأعلى معايير الجودة في كل مشروع"
    },
    {
      icon: <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "السرعة",
      desc: "ننجز مشاريعك في الوقت المحدد دون تأخير"
    },
    {
      icon: <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: "الفريق",
      desc: "فريق متخصص ذو خبرة عالية في المجال"
    },
    {
      icon: <svg className="w-8 h-8 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: "الضمان",
      desc: "ضمان شامل على جميع خدماتنا وقطع الغيار"
    }
  ];

  const stats = [
    { number: "+15", label: "سنوات خبرة" },
    { number: "+500", label: "مشروع منجز" },
    { number: "+50", label: "عميل سعيد" },
    { number: "+20", label: "فني متخصص" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px] pt-16 bg-gray-900">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/about-preload.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/about.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed">
              رواد المصاعد والسلالم الكهربائية
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              نقدم حلولاً متكاملة بأعلى معايير الجودة والسلامة منذ أكثر من 15 عاماً
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div data-aos="fade-left">
              
              <h2 className="text-3xl font-bold text-gray-900 mt-2 border-b-2 border-yellow-700 inline-block pb-2">
                رواد المصاعد والسلالم الكهربائية
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                شركة بالانس رائدة في مجال المصاعد والسلالم الكهربائية والمماشي المتحركة. نقدم حلولاً متكاملة تشمل التركيب والصيانة وقطع الغيار بأعلى معايير الجودة والسلامة.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                نعمل مع كبرى الشركات والفنادق والمولات التجارية لتقديم أفضل الخدمات بأيدي فريق متخصص ذو خبرة عالية في هذا المجال. نلتزم بالمواعيد ونقدم ضماناً شاملاً على جميع أعمالنا.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "فريق فني متخصص ومعتمد",
                  "قطع غيار أصلية 100%",
                  "ضمان شامل على جميع الخدمات",
                  "خدمة عملاء 24/7"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Image */}
            <div data-aos="fade-right">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                 <img src="/elevator-maintain.jpg" alt="About Us" className="w-full h-full object-cover" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
            تميزنا يتكون في 
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-stone-50 rounded-xl p-8 text-center hover:shadow-lg transition" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="w-16 h-16 bg-yellow-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <img
            src="/about-2.png"
            alt="Stats Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center" data-aos="fade-up" data-aos-delay={idx * 100}>
                <p className="text-4xl md:text-5xl font-bold text-yellow-500">{stat.number}</p>
                <p className="mt-2 text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div data-aos="fade-left">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img src="/elevator-modernize.jpg" alt="رؤيتنا" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Text */}
            <div data-aos="fade-right">
              
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                نسعى لأن نكون الخيار الأول
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                نطمح أن نكون الشركة الرائدة في مجال المصاعد والسلالم الكهربائية في المملكة. نسعى دائماً لتقديم أحدث التقنيات والحلول المبتكرة لعملائنا.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "الابتكار والتطوير المستمر",
                  "الالتزام بأعلى معايير السلامة",
                  "تطوير كوادرنا البشرية",
                  "بناء علاقات طويلة الأمد مع عملائنا"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div data-aos="fade-left">
              
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                تقديم حلول آمنة ومبتكرة
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                مهمتنا هي تقديم خدمات متكاملة بأعلى معايير الجودة والسلامة. نعمل بشغف لنرتقي بتجربة عملائنا ونضمن رضاهم الكامل.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "توفير منتجات عالية الجودة",
                  "ضمان السلامة في كل مشروع",
                  "تقديم خدمة عملاء متميزة",
                  "الاستدامة البيئية في عملياتنا"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-yellow-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Image */}
            <div data-aos="fade-right">
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img src="/consulting.jpg" alt="مهمتنا" className="w-full h-full object-cover" />
              </div>
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
                  هل تريد معرفة المزيد عنا؟
                </h2>
                <p className="mt-2 md:mt-3 text-blue-100 text-xs md:text-sm leading-relaxed hidden md:block">
                  تواصل معنا اليوم وسنكون سعداء بالإجابة على جميع استفساراتك.
                </p>
                <div className="mt-3 md:mt-4">
                  <Link href="/#contact" className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium transition text-xs md:text-sm">
                    تواصل معنا
                  </Link>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative h-32 md:h-80 -mt-8 md:-mt-16 flex items-start justify-center">
                <img 
                  src="/servicef_footer.png" 
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
