import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "مصعد ركاب مودرن",
    price: "150,000 ج.م",
    image: "/modern-elevator-interior.jpg",
    description: "تصميم عصري يناسب المباني السكنية والإدارية.",
  },
  {
    id: 2,
    name: "مصعد بانوراما فاخر",
    price: "280,000 ج.م",
    image: "/panoramic-glass-elevator.jpg",
    description: "إطلالة خلابة وتصميم زجاجي فريد للمراكز التجارية.",
  },
  {
    id: 3,
    name: "مصعد شحن هيدروليك",
    price: "210,000 ج.م",
    image: "/freight-elevator.jpg",
    description: "قوة تحمل عالية للأوزان الثقيلة في المصانع والمخازن.",
  },
]

export function ProductList() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl mb-4">منتجاتنا المتميزة</h2>
          <p className="text-muted-foreground">نوفر مجموعة واسعة من حلول النقل الرأسي بأسعار تنافسية.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardHeader>
              <CardFooter className="flex items-center justify-between border-t pt-6">
                <span className="text-xl font-bold font-serif">{product.price}</span>
                <button className="text-sm uppercase tracking-tighter underline underline-offset-4 hover:opacity-60 transition-opacity">
                  التفاصيل
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
