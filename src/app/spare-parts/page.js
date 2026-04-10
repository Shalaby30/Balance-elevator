"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SpareParts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedParts, setSelectedParts] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const { data, error } = await supabase
        .from("spare_parts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setParts(data || []);
    } catch (err) {
      setError("خطأ في تحميل قطع الغيار");
      console.error("Error fetching parts:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-EG").format(price);
  };

  const togglePartSelection = (part) => {
    setSelectedParts(prev => {
      const isSelected = prev.find(p => p.id === part.id);
      if (isSelected) {
        return prev.filter(p => p.id !== part.id);
      }
      return [...prev, { ...part, quantity: 1 }];
    });
  };

  const updateQuantity = (partId, delta) => {
    setSelectedParts(prev => prev.map(p => {
      if (p.id === partId) {
        const newQty = Math.max(1, (p.quantity || 1) + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  const removePart = (partId) => {
    setSelectedParts(prev => prev.filter(p => p.id !== partId));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (selectedParts.length === 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/spare-part-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          parts: selectedParts.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity || 1,
            total: p.price * (p.quantity || 1)
          }))
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
        setSelectedParts([]);
        setFormData({ name: "", phone: "", location: "", notes: "" });
        setTimeout(() => {
          setShowRequestForm(false);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setError(data.error || "حدث خطأ أثناء الإرسال");
      }
    } catch (err) {
      setError("حدث خطأ أثناء الإرسال");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      
      {/* Spare Parts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
            </div>
          ) : parts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">لا توجد قطع غيار متوفرة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {parts.map((part, idx) => {
                const isSelected = selectedParts.find(p => p.id === part.id);
                return (
                  <div 
                    key={part.id} 
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={part.image_url || "/placeholder.jpg"}
                        alt={part.name}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 text-right">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {part.name}
                      </h3>
                      
                      {/* Description */}
                      {part.description && (
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {part.description}
                        </p>
                      )}

                      {/* Price & Quantity & Button Row */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-400">السعر</span>
                          <p className="text-xl font-bold text-gray-900">
                            {isSelected 
                              ? formatPrice(part.price * (isSelected.quantity || 1))
                              : formatPrice(part.price)
                            } <span className="text-sm font-normal text-gray-400">ج</span>
                          </p>
                        </div>
                        
                        {isSelected ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(part.id, -1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {isSelected.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(part.id, 1)}
                              className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition"
                            >
                              +
                            </button>
                            <button
                              onClick={() => togglePartSelection(part)}
                              className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-200 transition"
                              title="إزالة من العربة"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => togglePartSelection(part)}
                            className="px-6 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                          >
                            أضف للعربة
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Selected Parts Summary - Fixed Bottom */}
      {selectedParts.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedParts.reduce((sum, p) => sum + (p.quantity || 1), 0)} قطعة
                </span>
                <span className="text-gray-600">
                  إجمالي: {formatPrice(selectedParts.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0))} جنيه
                </span>
              </div>
              <button
                onClick={() => setShowRequestForm(true)}
                className="bg-yellow-700 hover:bg-yellow-800 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                إتمام الطلب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">طلب قطع الغيار</h2>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Selected Parts List */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-700 mb-3">القطع المختارة:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedParts.map(part => (
                    <div key={part.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm text-gray-900">{part.name}</span>
                      <div className="flex items-center gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
                          <button
                            onClick={() => updateQuantity(part.id, -1)}
                            className="w-6 h-6 bg-white rounded flex items-center justify-center text-gray-600 text-sm"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-medium text-sm">{part.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(part.id, 1)}
                            className="w-6 h-6 bg-white rounded flex items-center justify-center text-gray-600 text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm text-yellow-700 font-medium">
                          {formatPrice(part.price * (part.quantity || 1))} جنيه
                        </span>
                        <button
                          onClick={() => removePart(part.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3 text-left">
                  <span className="font-bold text-gray-900">
                    الإجمالي: {formatPrice(selectedParts.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0))} جنيه
                  </span>
                </div>
              </div>

              {submitSuccess ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-medium">تم إرسال طلبك بنجاح!</p>
                  <p className="text-sm mt-1">سيتواصل معك فريقنا قريباً</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="الاسم *"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-black"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="رقم الجوال *"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-black"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="العنوان / الموقع"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-black"
                  />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="ملاحظات إضافية"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-black resize-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting || selectedParts.length === 0}
                    className="w-full py-3 bg-yellow-700 hover:bg-yellow-800 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
                  >
                    {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
