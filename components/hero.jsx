export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 text-center z-10">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1] tracking-tight text-balance">
          الأمان والكفاءة في <br /> كل رحلة صعود
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground mb-12 text-pretty leading-relaxed">
          نقدم حلول المصاعد المتكاملة التي تجمع بين التكنولوجيا الحديثة والتصميم الفاخر لضمان راحة وسلامة مستخدميكم.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all uppercase tracking-widest text-sm">
            استعرض منتجاتنا
          </button>
          <button className="border border-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest text-sm">
            طلب معاينة مجانية
          </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[128px]" />
      </div>
    </section>
  )
}
