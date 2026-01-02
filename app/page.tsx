import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProductList } from "@/components/product-list"
import { InspectionForm } from "@/components/inspection-form"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen">

      <Hero />
      <ProductList />
      <InspectionForm />
    </main>
  )
}
