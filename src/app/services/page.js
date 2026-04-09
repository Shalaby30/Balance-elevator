"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Services() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const services = [
    {
      id: "install",
      title: "تركيب المصاعد",
      desc: "نقدم خدمات تركيب المصاعد بأعلى معايير الجودة والسلامة، مع ضمان شامل على جميع أعمال التركيب. فريقنا المتخصص يضمن تركيب المصاعد بأحدث التقنيات والمواصفات العالمية.",
      features: [
        "فريق تركيب معتمد ومتخصص",
        "استخدام أحدث معدات التركيب",
        "ضمان 5 سنوات على التركيب",
        "اختبارات سلامة شاملة بعد التركيب"
      ],
      image: "/elevator-install.jpg",
      imageAlt: "تركيب المصاعد"
    },
    {
      id: "maintain",
      title: "صيانة المصاعد",
      desc: "خدمات صيانة دورية وشاملة لضمان أداء مثالي طوال الوقت، مع فريق فني متخصص ومتاح على مدار الساعة. نقدم خطط صيانة متنوعة تناسب جميع الاحتياجات.",
      features: [
        "صيانة دورية مجدولة",
        "فريق فني متاح 24/7",
        "قطع غيار أصلية",
        "تقارير صيانة دورية"
      ],
      image: "/elevator-maintain.jpg",
      imageAlt: "صيانة المصاعد"
    },
    {
      id: "spare",
      title: "قطع الغيار",
      desc: "نوفر قطع غيار أصلية من كبرى الشركات العالمية مع ضمان شامل على جميع القطع المستبدلة. جميع القطع تخضع لاختبارات جودة صارمة قبل التوريد.",
      features: [
        "قطع أصلية 100%",
        "ضمان شامل على القطع",
        "توصيل سريع",
        "تركيب احترافي"
      ],
      image: "/elevator-spare.jpg",
      imageAlt: "قطع الغيار"
    },
    {
      id: "modernize",
      title: "تحديث وتطوير المصاعد",
      desc: "نقدم حلولاً متكاملة لتحديث المصاعد القديمة لتتوافق مع أحدث المعايير الدولية والتقنيات الحديثة. نضمن تحسين الأداء والسلامة والكفاءة الطاقية.",
      features: [
        "تحديث الأنظمة القديمة",
        "تركيب أنظمة توفير الطاقة",
        "تحديث كابينة المصعد",
        "ضمان شامل على التحديثات"
      ],
      image: "/elevator-modernize.jpg",
      imageAlt: "تحديث المصاعد"
    },
    {
      id: "escalator",
      title: "السلالم الكهربائية",
      desc: "خدمات متكاملة للسلالم الكهربائية تشمل التركيب والصيانة والتحديث. نقدم حلولاً للمراكز التجارية والمولات والمباني الكبيرة.",
      features: [
        "تركيب السلالم الكهربائية",
        "صيانة دورية شاملة",
        "إصلاح الأعطال",
        "تحديث الأنظمة"
      ],
      image: "/escalator.jpg",
      imageAlt: "السلالم الكهربائية"
    },
    {
      id: "consult",
      title: "استشارات فنية",
      desc: "استشارات متخصصة لاختيار الحل الأمثل لاحتياجاتك من قبل مهندسين ذوي خبرة وكفاءة عالية. نقدم تقييمات شاملة لجميع المشاريع.",
      features: [
        "دراسة جدوى المشروع",
        "تصميم حلول مخصصة",
        "تقييم المصاعد القائمة",
        "خطط صيانة مخصصة"
      ],
      image: "/consulting.jpg",
      imageAlt: "استشارات فنية"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative min-h-[400px] pt-16 bg-gray-900">
        <div className="absolute inset-0">
          <img 
            src="/services-hero.jpg" 
            alt="خدماتنا" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-yellow-900/30 to-gray-900/80" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <span className="text-yellow-600 font-semibold">خدماتنا</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
              حلول متكاملة للمصاعد والسلالم الكهربائية
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات بأعلى معايير الجودة العالمية
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, idx) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid grid-cols-2 gap-6 md:gap-12 items-center ${idx % 2 === 1 ? '' : ''}`}
                data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
              >
                {/* Image */}
                <div className={`${idx % 2 === 1 ? 'order-2' : ''}`} data-aos={idx % 2 === 0 ? "fade-left" : "fade-right"}>
                  <div className="bg-gray-200 rounded-xl md:rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden shadow-lg">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className={`${idx % 2 === 1 ? 'order-1' : ''}`}>
                  <h2 className="text-lg md:text-3xl font-bold text-gray-900 mt-2 border-b-2 border-yellow-700 inline-block pb-2">
                    {service.title}
                  </h2>
                  <p className="mt-3 md:mt-6 text-gray-600 leading-relaxed text-sm md:text-base">
                    {service.desc}
                  </p>
                  <ul className="mt-3 md:mt-6 space-y-2 md:space-y-3">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 md:gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 md:mt-8">

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl overflow-visible relative mt-16">
            <div className="grid grid-cols-2 items-end">
              {/* Text Side - now on left */}
              <div className="p-4 md:p-8 text-right">
                <h2 className="text-sm md:text-2xl font-bold text-white leading-relaxed">
                  حلول شاملة ترفقك من التخطيط إلى التشغيل
                </h2>
                <p className="mt-2 md:mt-3 text-blue-100 text-xs md:text-sm leading-relaxed hidden md:block">
                  فريق متخصص جاهز لمساعدتك في اختيار الحل الأمثل لمشروعك.
                </p>
                <div className="mt-3 md:mt-4">
                  <Link href="/#contact" className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium transition text-xs md:text-sm">
                    تواصل معنا
                  </Link>
                </div>
              </div>
              
              {/* Image Side - now on right */}
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
