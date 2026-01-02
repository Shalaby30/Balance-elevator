import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <section id="contact" className="py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl mb-8 font-serif">تواصل معنا</h2>
                        <p className="text-primary-foreground/60 mb-12 text-lg">
                            نحن هنا لمساعدتكم في أي استفسار يخص المصاعد أو خدمات الصيانة. فريقنا متاح للرد على مدار الساعة.
                        </p>
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-widest text-primary-foreground/40 mb-1">اتصل بنا</p>
                                    <p className="text-xl">0123456789</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-widest text-primary-foreground/40 mb-1">البريد الإلكتروني</p>
                                    <p className="text-xl">info@elevatorbalance.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-widest text-primary-foreground/40 mb-1">المكتب الرئيسي</p>
                                    <p className="text-xl">اشارع سيف سيدي بشر قبلي</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-3xl p-12 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl mb-6">تابعونا على منصات التواصل</h3>
                            <div className="flex gap-4">
                                {[Instagram, Facebook, Linkedin].map((Icon, idx) => (
                                    <button
                                        key={idx}
                                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 pt-12 border-t border-white/10">
                            <p className="text-sm text-primary-foreground/40 mb-2">ساعات العمل</p>
                            <p className="text-lg">السبت - الخميس: 9:00ص - 6:00م</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}