"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function InspectionForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "تم استلام طلبك",
        description: "سيتواصل معك فريق المعاينة في أقرب وقت ممكن.",
      })
      e.target.reset()
    }, 1500)
  }

  return (
    <section id="inspection" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-2xl shadow-black/5">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">طلب معاينة الموقع</h2>
            <p className="text-muted-foreground">اترك تفاصيلك وسيقوم خبراؤنا بزيارة موقعك لتقديم أفضل الحلول.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  الاسم بالكامل
                </label>
                <Input required placeholder="ادخل اسمك هنا" className="h-14 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  رقم الهاتف
                </label>
                <Input required type="tel" placeholder="01xxxxxxxxx" className="h-14 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                عنوان المعاينة
              </label>
              <Input required placeholder="المنطقة، الشارع، رقم المبنى" className="h-14 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                تفاصيل إضافية
              </label>
              <Textarea
                placeholder="أخبرنا المزيد عن متطلباتك أو طبيعة المبنى"
                className="min-h-[150px] rounded-xl pt-4"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-16 text-lg rounded-full font-serif font-bold">
              {loading ? "جاري الإرسال..." : "تأكيد طلب المعاينة"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
