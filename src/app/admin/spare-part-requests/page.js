"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function SparePartRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/spare-part-requests");
      const data = await response.json();
      
      if (data.success) {
        setRequests(data.requests);
      } else {
        setError(data.error || "خطأ في تحميل الطلبات");
      }
    } catch (err) {
      setError("خطأ في تحميل الطلبات");
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch("/api/spare-part-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });

      const data = await response.json();
      if (data.success) {
        setRequests(prev => prev.map(r => 
          r.id === id ? { ...r, status } : r
        ));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteRequest = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    
    try {
      const response = await fetch(`/api/spare-part-requests?id=${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        setRequests(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ar-EG").format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      contacted: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200"
    };
    const labels = {
      pending: "جديد",
      contacted: "تم التواصل",
      completed: "مكتمل"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  const calculateTotal = (parts) => {
    return parts.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 1)), 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <p className="text-2xl font-bold text-yellow-700">
            {requests.filter(r => r.status === 'pending').length}
          </p>
          <p className="text-xs text-yellow-600 mt-1">طلبات جديدة</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <p className="text-2xl font-bold text-blue-700">
            {requests.filter(r => r.status === 'contacted').length}
          </p>
          <p className="text-xs text-blue-600 mt-1">تم التواصل</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-2xl font-bold text-green-700">
            {requests.filter(r => r.status === 'completed').length}
          </p>
          <p className="text-xs text-green-600 mt-1">مكتمل</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
          {error}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-600">لا توجد طلبات قطع غيار</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{request.name}</h3>
                  {getStatusBadge(request.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(request.created_at)}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-4 border-t border-gray-100 pt-4 mb-4">
                <a href={`tel:${request.phone}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">رقم الجوال</p>
                    <p className="text-gray-900 font-medium">{request.phone}</p>
                  </div>
                </a>

                {request.email && (
                  <a href={`mailto:${request.email}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">البريد</p>
                      <p className="text-gray-900 font-medium">{request.email}</p>
                    </div>
                  </a>
                )}

                {request.location && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">الموقع</p>
                      <p className="text-gray-900 font-medium">{request.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Requested Parts */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-700 mb-3">القطع المطلوبة:</h4>
                <div className="space-y-2">
                  {request.parts.map((part, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded">
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                          ×{part.quantity || 1}
                        </span>
                        <span className="text-gray-900">{part.name}</span>
                      </div>
                      <span className="text-yellow-700 font-medium">
                        {formatPrice(part.price * (part.quantity || 1))} جنيه
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3 text-left">
                  <span className="font-bold text-gray-900 text-lg">
                    الإجمالي: {formatPrice(calculateTotal(request.parts))} جنيه
                  </span>
                </div>
              </div>

              {/* Notes */}
              {request.notes && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-1">ملاحظات:</p>
                  <p className="text-gray-700">{request.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
                <span className="text-sm text-gray-500">تغيير الحالة:</span>
                <select
                  value={request.status}
                  onChange={(e) => updateStatus(request.id, e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
                >
                  <option value="pending">جديد</option>
                  <option value="contacted">تم التواصل</option>
                  <option value="completed">مكتمل</option>
                </select>
                
                <button
                  onClick={() => deleteRequest(request.id)}
                  className="mr-auto flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
